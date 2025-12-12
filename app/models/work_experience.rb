class WorkExperience < ApplicationRecord
  belongs_to :curriculum, touch: true

  # Validaciones
  validates :position, :company, :status, presence: true
  validates :position, length: { minimum: 2, maximum: 100 }
  validates :company, length: { minimum: 2, maximum: 100 }
  validates :responsibilities, length: { maximum: 2000 }, allow_blank: true
  validates :achievements, length: { maximum: 2000 }, allow_blank: true
  validates :status, inclusion: { in: %w[cursando finalizado] }
  validates :start_date, presence: true
  validate :end_date_after_start_date

  private

  def end_date_after_start_date
    return if end_date.blank? || start_date.blank?

    if end_date < start_date
      errors.add(:end_date, "debe ser posterior a la fecha de inicio")
    end
  end
end
