# frozen_string_literal: true

module AuthStrategies
  class JwtStrategy < ::Warden::Strategies::Base
    def valid?
      request.fetch_header('HTTP_AUTHORIZATION')
    end

    def authenticate!
      # TODO: to prevent cookie stealing attack, it's possible to create extra table (e.g. UserAuth)
      # and finds record from UserAuth by primary key = token, device, location. If there is no record,
      # then fail auth and ask user to login. In this case, it's equal to functionality where we assign user
      # to his device and location. Even if hacker steals cookies, he can't use JWT due to
      # possibly different location or different device.
      token = request.fetch_header('HTTP_AUTHORIZATION')
      interaction = Users::JwtAuthenticate.run(token: token)

      return success!(interaction.result) if interaction.valid?

      fail! 'bad token!'
    end
  end
end
