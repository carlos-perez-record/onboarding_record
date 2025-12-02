class User < ApplicationRecord
  # Roles enum: 0=admin, 1=usuario (default), 2=recruiter
  enum :role, { admin: 0, usuario: 1, recruiter: 2 }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
