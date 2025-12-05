class Study < ApplicationRecord
  belongs_to :curriculum

  validates :institution, presence: true
  validates :status, inclusion: { in: %w[cursando pausado finalizado], allow_blank: true }
end
