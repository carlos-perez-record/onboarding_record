# frozen_string_literal: true

# TurboStreamable concern provides reusable Turbo Stream response helpers
# DRY principle: Avoid repeating respond_to blocks for delete actions
module TurboStreamable
  extend ActiveSupport::Concern

  included do
    private

    # Respond with Turbo Stream for deletion or fallback to HTML redirect
    # Usage: respond_with_deletion(@user, admin_users_path, "Usuario #{@user.email}")
    def respond_with_deletion(resource, redirect_path, success_message)
      respond_to do |format|
        format.turbo_stream do
          render turbo_stream: turbo_stream.remove("user_#{resource.id}")
        end
        format.html { redirect_to redirect_path, notice: "#{success_message} eliminado correctamente." }
      end
    end

    # Respond with Turbo Stream for updates or fallback to HTML redirect
    # Usage: respond_with_update(@user, admin_users_path, "Usuario actualizado")
    def respond_with_update(resource, redirect_path, success_message, render_action = :edit)
      if resource.save
        redirect_to redirect_path, notice: success_message
      else
        render render_action, status: :unprocessable_entity
      end
    end
  end
end
