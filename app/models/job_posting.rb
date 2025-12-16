class JobPosting < ApplicationRecord
  # Estados: creado (0), vigente (1), cerrado (2)
  enum :status, { creado: 0, vigente: 1, cerrado: 2 }

  # Asociaciones
  belongs_to :user
  has_one_attached :image

  # Validaciones
  validates :title, presence: true, length: { minimum: 3, maximum: 100 }
  validates :start_date, presence: true
  validates :end_date, presence: true
  validate :end_date_after_start_date
  validate :image_validation

  # Scopes
  scope :active, -> { where(status: :vigente).where("start_date <= ? AND end_date >= ?", Date.current, Date.current) }
  scope :by_recent, -> { order(created_at: :desc) }

  # Métodos
  def active?
    vigente? && start_date <= Date.current && end_date >= Date.current
  end

  def expired?
    end_date < Date.current
  end

  private

  def end_date_after_start_date
    return if end_date.blank? || start_date.blank?

    if end_date <= start_date
      errors.add(:end_date, "debe ser posterior a la fecha de inicio")
    end
  end

  def image_validation
    return unless image.attached?

    # Validar tipo de contenido
    unless image.content_type.in?(%w[image/jpeg image/jpg image/png image/webp])
      errors.add(:image, "debe ser JPG, PNG o WebP")
    end

    # Validar tamaño
    if image.byte_size > 2.megabytes
      errors.add(:image, "debe ser menor a 2MB")
    end
  end
end
