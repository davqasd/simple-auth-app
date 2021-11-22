# frozen_string_literal: true

class User < ApplicationRecord
  has_many :auth_providers, dependent: :destroy

  validates :email, uniqueness: true
end
