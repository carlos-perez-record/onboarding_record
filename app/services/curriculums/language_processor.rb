# frozen_string_literal: true

module Curriculums
  # Service to process languages from curriculum form
  # Handles custom language inputs and merges with selected languages
  #
  # Usage:
  #   processor = Curriculums::LanguageProcessor.new(curriculum_params)
  #   processed_params = processor.call
  #
  class LanguageProcessor < ApplicationService
    attr_reader :params

    def initialize(params)
      @params = params.dup
    end

    def call
      process_languages
      params
    end

    private

    def process_languages
      # Limpiar idiomas vacíos primero
      cleanup_languages

      # Solo procesar idiomas personalizados si hay
      if other_languages_present?
        merge_custom_languages
        cleanup_languages  # Limpiar nuevamente después de merge
      end

      remove_other_languages_param
    end

    def other_languages_present?
      params[:other_languages].present? && params[:other_languages].is_a?(String)
    end

    def merge_custom_languages
      custom_languages = extract_custom_languages
      current_languages = params[:languages] || []

      params[:languages] = (current_languages + custom_languages).uniq.compact.reject(&:blank?)
    end

    def extract_custom_languages
      params[:other_languages]
        .split(',')
        .map(&:strip)
        .reject(&:blank?)
    end

    def cleanup_languages
      return unless params[:languages].is_a?(Array)

      params[:languages] = params[:languages]
        .compact
        .map(&:strip)
        .reject(&:blank?)
        .uniq
    end

    def remove_other_languages_param
      params.delete(:other_languages)
    end
  end
end
