class Curriculum < ApplicationRecord
  belongs_to :user
  has_one_attached :photo, dependent: :destroy

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
end
