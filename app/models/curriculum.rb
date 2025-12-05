class Curriculum < ApplicationRecord
  belongs_to :user
  has_one_attached :photo, dependent: :destroy
  has_many :studies, dependent: :destroy
  
  accepts_nested_attributes_for :studies, allow_destroy: true, reject_if: :all_blank

  # Callbacks para organizar archivos
  before_save :prepare_photo_key, if: :photo_attached_and_new?
  after_commit :organize_photo_storage, if: :should_organize_photo?

  # Validaciones
  validates :first_name, :last_name, presence: true, length: { minimum: 2, maximum: 50 }
  validates :birth_date, presence: true
  validates :identification, presence: true, uniqueness: true, length: { minimum: 5, maximum: 20 }
  validates :phone_number, presence: true, format: { with: /\A[0-9\-\+\s\(\)]+\z/, message: "debe ser un formato válido" }
  validates :address, :city, :department, :country, presence: true, length: { minimum: 2, maximum: 100 }
  validates :profile_description, length: { maximum: 2000 }, allow_blank: true
  validates :available_to_travel, :available_to_relocate, inclusion: { in: [true, false] }

  # Validación de edad (mayor a 18 años)
  validate :must_be_at_least_18_years_old
  # Validación de foto
  validate :validate_photo

  # Serialización de idiomas
  serialize :languages, type: Array, coder: JSON

  def age
    calculate_age
  end

  private

  def must_be_at_least_18_years_old
    return unless birth_date.present?
    
    age = calculate_age
    if age < 18
      errors.add(:birth_date, "debes ser mayor de 18 años para registrar tu currículum")
    end
  end

  def validate_photo
    if photo.attached?
      # Validar tipo de contenido
      unless photo.content_type.in?(%w[image/jpeg image/png])
        errors.add(:photo, "debe ser JPEG o PNG")
      end
      
      # Validar tamaño
      if photo.byte_size > 2.megabytes
        errors.add(:photo, "debe ser menor a 2 MB")
      end
    end
  end

  def calculate_age
    today = Date.today
    age = today.year - birth_date.year
    age -= 1 if today.month < birth_date.month || (today.month == birth_date.month && today.day < birth_date.day)
    age
  end

  def photo_attached_and_new?
    photo.attached? && photo.attachment.new_record?
  end

  def should_organize_photo?
    @should_organize_photo ||= false
  end

  def prepare_photo_key
    @should_organize_photo = true if photo.attached?
  end

  def organize_photo_storage
    return unless photo.attached?
    
    blob = photo.blob
    old_key = blob.key
    
    # Estructura: identificacion/Foto_personal_identificacion.extension
    extension = File.extname(blob.filename.to_s)
    new_filename = "Foto_personal_#{identification}#{extension}"
    new_key = "#{identification}/#{new_filename}"
    
    # Solo reorganizar si el key es diferente
    if old_key != new_key
      # Buscar y eliminar blobs anteriores con la misma key
      ActiveStorage::Blob.where(key: new_key).where.not(id: blob.id).find_each do |old_blob|
        # Eliminar el archivo físico
        old_path = ActiveStorage::Blob.service.path_for(old_blob.key)
        File.delete(old_path) if File.exist?(old_path)
        
        # Eliminar el blob de la base de datos
        old_blob.purge
      end
      
      # Buscar y eliminar archivos huérfanos en la carpeta del aspirante
      directory = File.join(ActiveStorage::Blob.service.root, identification.to_s)
      if Dir.exist?(directory)
        Dir.glob(File.join(directory, "Foto_personal_#{identification}*")).each do |old_file|
          File.delete(old_file) if File.exist?(old_file) && old_file != ActiveStorage::Blob.service.path_for(new_key)
        end
      end
      
      # Obtener rutas usando el path_for personalizado
      old_path = ActiveStorage::Blob.service.path_for(old_key)
      new_path = ActiveStorage::Blob.service.path_for(new_key)
      
      # Crear directorio si no existe
      FileUtils.mkdir_p(File.dirname(new_path))
      
      # Mover archivo si existe
      if File.exist?(old_path)
        FileUtils.mv(old_path, new_path)
        
        # Limpiar carpeta antigua si está vacía
        old_dir = File.dirname(old_path)
        if Dir.exist?(old_dir) && Dir.empty?(old_dir)
          FileUtils.rmdir(old_dir)
          # Intentar limpiar directorios padres vacíos
          parent_dir = File.dirname(old_dir)
          FileUtils.rmdir(parent_dir) if Dir.exist?(parent_dir) && Dir.empty?(parent_dir)
        end
      end
      
      # Actualizar la clave y el filename en la base de datos
      blob.update_columns(key: new_key, filename: new_filename)
    end
    
    @should_organize_photo = false
  end
end
