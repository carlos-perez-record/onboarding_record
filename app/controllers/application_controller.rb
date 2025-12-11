class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  # Optimización N+1: Precargar curriculum del usuario actual
  def current_user_with_curriculum
    return nil unless user_signed_in?
    @current_user_with_curriculum ||= User.includes(:curriculum).find(current_user.id)
  end
  helper_method :current_user_with_curriculum
end
