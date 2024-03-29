# frozen_string_literal: true

WARDEN_FOLDERS = %w[auth_strategies users].join(',').freeze
Dir.glob(Rails.root.join('lib', "{#{WARDEN_FOLDERS}}", '*.rb')).sort.each { |file| require file }

Rails.application.config.middleware.insert_after ActionDispatch::Session::CookieStore, Warden::Manager do |manager|
  manager.default_strategies :api_password
  manager.failure_app = ->(env) { Api::UnauthorizedController.action(:index).call(env) }
end

# Runs after successfull auth and saves token to session['warden.user.default.key']
Warden::Manager.serialize_into_session do |user|
  Users::JsonWebToken.encode(user.id)
end

Warden::Manager.serialize_from_session do |token|
  User.find(Users::JsonWebToken.decode(token).dig(:payload, :id))
end

Warden::Manager.before_logout scope: :user do |user, auth, opts|
  # TODO: if needed, it's possible to store JWTs which are no longer valid and check them in jwt strategy
  # InvalidToken.create(token: request.fetch_header('HTTP_AUTHORIZATION'))
end

Warden::Strategies.add(:api_password, AuthStrategies::ApiPasswordStrategy)
Warden::Strategies.add(:jwt, AuthStrategies::JwtStrategy)
