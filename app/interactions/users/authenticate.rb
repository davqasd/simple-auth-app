# frozen_string_literal: true

module Users
  class Authenticate < ActiveInteraction::Base
    record :user
    string :password

    def execute
      authenticate
    end

    private

    def authenticate
      # TODO: check opposite: user.encrypted_password == encrypt(password)
      BCrypt::Password.new(user.encrypted_password) == password
    end
  end
end
