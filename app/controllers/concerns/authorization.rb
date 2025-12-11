# frozen_string_literal: true

# Authorization concern provides reusable authorization methods
# DRY principle: Avoid repeating authorization checks across controllers
module Authorization
  extend ActiveSupport::Concern

  included do
    # Make these methods available as before_action callbacks
    private

    # Check if current user is admin, redirect if not
    def authorize_admin!
      return if current_user&.admin?

      redirect_to root_path, alert: "No tienes permiso para acceder a esta sección."
    end

    # Check if current user is recruiter, redirect if not
    def authorize_recruiter!
      return if current_user&.reclutador?

      redirect_to root_path, alert: "No tienes permiso para acceder a esta sección."
    end

    # Check if current user is aspirant, redirect if not
    def authorize_aspirant!
      return if current_user&.aspirante?

      redirect_to root_path, alert: "Debes ser aspirante para acceder a esta sección."
    end

    # Check if user owns the resource, redirect if not
    # Usage: authorize_ownership!(@curriculum, 'curriculum')
    def authorize_ownership!(resource, resource_name = 'recurso')
      return if resource.user_id == current_user.id

      redirect_to root_path, alert: "No tienes permiso para acceder a este #{resource_name}."
    end
  end
end
