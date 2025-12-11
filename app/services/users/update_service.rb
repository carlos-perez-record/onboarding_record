# frozen_string_literal: true

module Users
  # Service to handle user update logic
  # Encapsulates password handling and update flow
  #
  # Usage:
  #   service = Users::UpdateService.new(user, user_params)
  #   if service.call
  #     # Handle success
  #   else
  #     # Handle failure, errors in service.user.errors
  #   end
  #
  class UpdateService < ApplicationService
    attr_reader :user, :params

    def initialize(user, params)
      @user = user
      @params = params
      @success = false
    end

    def call
      update_user
      @success
    end

    def success?
      @success
    end

    private

    def update_user
      if password_blank?
        update_without_password
      else
        update_with_password
      end
    end

    def password_blank?
      params[:password].blank?
    end

    def update_without_password
      params_without_password = params.except(:password, :password_confirmation)
      @success = user.update(params_without_password)
      log_update_result('without password')
    end

    def update_with_password
      @success = user.update(params)
      log_update_result('with password')
    end

    def log_update_result(type)
      if @success
        log_info("User updated successfully #{type}", user_id: user.id)
      else
        log_error_details(type)
      end
    end

    def log_error_details(type)
      log_error(
        StandardError.new("User update failed #{type}"),
        user_id: user.id,
        errors: user.errors.full_messages
      )
    end
  end
end
