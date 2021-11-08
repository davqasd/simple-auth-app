# frozen_string_literal: true

module AuthStrategies
  class ApiPasswordStrategy < ::Warden::Strategies::Base
    def valid?
      params['email'] && params['password']
    end

    def authenticate!
      user = User.find_by(email: params['email'])
      return success!(user) if user && Users::PasswordAuthenticate.run!(user: user, password: params['password'])

      fail! 'Invalid email or password'
    end

    def params
      @params ||= JSON.parse(request.body.read)
    rescue JSON::ParserError
      {}
    end
  end
end
