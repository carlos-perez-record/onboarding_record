class JobApplication < ApplicationRecord
  belongs_to :user
  belongs_to :job_posting

  # Estados de la aplicación
  enum :status, { pendiente: 0, revisado: 1, aceptado: 2, rechazado: 3 }, default: :pendiente

  # Validaciones
  validates :user_id, uniqueness: { scope: :job_posting_id, message: "ya participa en esta convocatoria" }
  validates :applied_at, presence: true

  # Callbacks
  before_validation :set_applied_at, on: :create

  # Scopes
  scope :by_recent, -> { order(applied_at: :desc) }

  private

  def set_applied_at
    self.applied_at ||= Time.current
  end
end
