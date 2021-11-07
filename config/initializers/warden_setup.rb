# frozen_string_literal: true

Rails.application.config.middleware.insert_after ActionDispatch::Session::CookieStore, Warden::Manager do |manager|
  manager.default_strategies :password
  manager.failure_app = ->(env) { Api::StaticController.action(:new).call(env) }
end

Warden::Manager.serialize_into_session do |user|
  Users::SessionTokenGenerator.run!(user: user)
end

Warden::Manager.serialize_from_session do |session_token|
  # TODO: realize multiple sessions
  # UserToken: user_id, token, expires_at
  # Remove all expired tokens
  User.find_by(session_token: session_token)
end

Warden::Manager.before_logout scope: :user do |user, _auth, _opts|
  user.update(session_token: nil)
end

Warden::Strategies.add(:password) do
  def valid?
    params['email'] && params['password']
  end

  def authenticate!
    user = User.find_by(email: params['email'])
    return success!(user) if user && Users::Authenticate.run!(user: user, password: params['password'])

    raise 'Invalid email or password'
  end
end
