# frozen_string_literal: true

module Curriculums
  # Service to handle curriculum creation
  # Encapsulates language processing and creation logic
  #
  # Usage:
  #   service = Curriculums::CreateService.new(user, curriculum_params)
  #   if service.call
  #     curriculum = service.curriculum
  #   else
  #     errors = service.curriculum.errors
  #   end
  #
  class CreateService < ApplicationService
    attr_reader :user, :params, :curriculum

    def initialize(user, params)
      @user = user
      @params = params
      @curriculum = nil
      @success = false
    end

    def call
      process_and_create
      @success
    end

    def success?
      @success
    end

    private

    def process_and_create
      processed_params = process_languages
      build_curriculum(processed_params)
      save_curriculum
    end

    def process_languages
      LanguageProcessor.call(params)
    end

    def build_curriculum(processed_params)
      @curriculum = user.build_curriculum(processed_params)
    end

    def save_curriculum
      @success = curriculum.save
      log_creation_result
    end

    def log_creation_result
      if @success
        log_info('Curriculum created successfully',
                 user_id: user.id,
                 curriculum_id: curriculum.id)
      else
        log_error(StandardError.new('Curriculum creation failed'),
                  user_id: user.id,
                  errors: curriculum.errors.full_messages)
      end
    end
  end
end
