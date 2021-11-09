# frozen_string_literal: true

module Users
  class JsonWebToken
    TOKEN_EXPIRATION_DAYS = 7

    def self.encode(user_id)
      payload = { id: user_id }
      payload[:exp] = TOKEN_EXPIRATION_DAYS.days.from_now.to_i

      JWT.encode(payload, Rails.application.secrets.secret_key_base)
    end

    def self.decode(token)
      body = JWT.decode(
        token.sub('Bearer ', ''),
        Rails.application.secrets.secret_key_base
      )[0]

      { payload: HashWithIndifferentAccess.new(body), status: true }
    rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
      { status: false }
    end
  end
end
