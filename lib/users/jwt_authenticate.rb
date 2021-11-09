# frozen_string_literal: true

module Users
  class JwtAuthenticate < ActiveInteraction::Base
    string :token

    def execute
      data = Users::JsonWebToken.decode(token)

      errors.add(:base, 'invalid token decoding') unless data[:status]
      user_id = data.dig(:payload, :id)

      User.find_by(id: user_id).tap do |user|
        errors.add(:base, "User with id=#{user_id} not found!") unless user
      end
    end
  end
end
