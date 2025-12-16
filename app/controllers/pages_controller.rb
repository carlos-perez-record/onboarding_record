class PagesController < ApplicationController
  def home
    # Cargar convocatorias activas para aspirantes y página pública
    if !user_signed_in? || (user_signed_in? && current_user.aspirante?)
      @job_postings = JobPosting.active.by_recent.includes(:image_attachment)
    end
  end

  # Development-only: show current user and session info for debugging
  def dev_session
    render plain: (
      "current_user: #{current_user&.email.inspect}\n" +
      "user_signed_in?: #{user_signed_in?}\n" +
      "session keys: #{session.keys.inspect}\n"
    )
  end

  # Development-only: force sign out and reset session
  def dev_logout
    if Rails.env.development?
      # sign_out accepts a scope (symbol) or resource
      begin
        sign_out(:user) if respond_to?(:sign_out)
      rescue => e
        Rails.logger.debug("dev_logout sign_out error: #{e.message}")
      end

      reset_session
      redirect_to root_path, notice: "Sesión de desarrollo cerrada"
    else
      head :not_found
    end
  end
end
