# frozen_string_literal: true

# RoleScopes concern provides common query scopes for User model based on roles
# Extracted to avoid duplicating role queries across controllers
module RoleScopes
  extend ActiveSupport::Concern

  included do
    # Scope: Get all aspirants (role = 1)
    scope :aspirants, -> { where(role: :aspirante) }

    # Scope: Get all recruiters (role = 2)
    scope :recruiters, -> { where(role: :reclutador) }

    # Scope: Get all admins (role = 0)
    scope :admins, -> { where(role: :admin) }

    # Scope: Get users excluding admins
    scope :non_admins, -> { where.not(role: :admin) }

    # Scope: Get recent users (created in last N days)
    scope :recent, ->(days = 30) { where('created_at >= ?', days.days.ago) }

    # Scope: Order by creation date (newest first)
    scope :newest_first, -> { order(created_at: :desc) }

    # Scope: Order by email alphabetically
    scope :by_email, -> { order(email: :asc) }
  end
end
