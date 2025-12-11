# frozen_string_literal: true

module Curriculums
  # Service to handle curriculum updates
  # Encapsulates language processing and update logic
  #
  # Usage:
  #   service = Curriculums::UpdateService.new(curriculum, curriculum_params)
  #   if service.call
  #     # Handle success
  #   else
  #     errors = service.curriculum.errors
  #   end
  #
  class UpdateService < ApplicationService
    attr_reader :curriculum, :params

    def initialize(curriculum, params)
      @curriculum = curriculum
      @params = params
      @success = false
    end

    def call
      process_and_update
      @success
    end

    def success?
      @success
    end

    private

    def process_and_update
      processed_params = process_languages
      update_curriculum(processed_params)
    end

    def process_languages
      LanguageProcessor.call(params)
    end

    def update_curriculum(processed_params)
      @success = curriculum.update(processed_params)
      log_update_result
    end

    def log_update_result
      if @success
        log_info('Curriculum updated successfully', curriculum_id: curriculum.id)
      else
        log_error(StandardError.new('Curriculum update failed'),
                  curriculum_id: curriculum.id,
                  errors: curriculum.errors.full_messages)
      end
    end
  end
end
