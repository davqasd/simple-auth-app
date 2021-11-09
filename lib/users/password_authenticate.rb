# frozen_string_literal: true

module Users
  class PasswordAuthenticate < ActiveInteraction::Base
    record :user
    string :password

    def execute
      authenticate
    end

    private

    def authenticate
      BCrypt::Password.new(user.encrypted_password) == password
    end
  end
end
