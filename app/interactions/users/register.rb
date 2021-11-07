# frozen_string_literal: true

module Users
  class Register < ActiveInteraction::Base
    string :email
    string :password
    string :password_confirmation

    validates :password, presence: true, length: { minimum: 8 }
    # TODO: validate password == password_confirmation

    def execute
      validate!
      encrypt_password
      save_user
    end

    private

    def encrypt_password
      @encrypt_password ||= BCrypt::Password.create(password)
    end

    def save_user
      @user = User.create(user_attributes)
    end

    def user_attributes
      inputs.
        except(:password, :password_confirmation).
        merge(encrypted_password: encrypt_password)
    end
  end
end
