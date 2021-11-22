# frozen_string_literal: true

class AuthProvider < ApplicationRecord
  belongs_to :user
end
