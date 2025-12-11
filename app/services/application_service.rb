# frozen_string_literal: true

# Base class for all Service Objects
# Provides common interface and helper methods
#
# Usage:
#   class MyService < ApplicationService
#     def initialize(param1, param2)
#       @param1 = param1
#       @param2 = param2
#     end
#
#     def call
#       # Business logic here
#       # Return result object or boolean
#     end
#   end
#
#   # Call service:
#   result = MyService.call(param1, param2)
#
class ApplicationService
  # Class method to instantiate and call the service
  def self.call(*args, **kwargs, &block)
    new(*args, **kwargs, &block).call
  end

  # Instance method to be implemented by subclasses
  # Should contain the main business logic
  def call
    raise NotImplementedError, "#{self.class} must implement #call"
  end

  private

  # Log errors with context
  def log_error(error, context = {})
    Rails.logger.error({
      service: self.class.name,
      error: error.message,
      backtrace: error.backtrace.first(5),
      context: context
    }.to_json)
  end

  # Log info messages
  def log_info(message, context = {})
    Rails.logger.info({
      service: self.class.name,
      message: message,
      context: context
    }.to_json)
  end
end
