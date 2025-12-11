class User < ApplicationRecord
  include RoleScopes

  # Roles enum: 0=admin, 1=aspirante (default), 2=reclutador
  enum :role, { admin: 0, aspirante: 1, reclutador: 2 }

  # Associations
  has_one :curriculum, dependent: :destroy, touch: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
