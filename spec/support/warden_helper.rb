# frozen_string_literal: true

RSpec.configure do |config|
  config.include Warden::Test::ControllerHelpers, type: :controller

  def sign_in(user)
    warden.set_user(user)
  end

  def generate_user(password)
    Users::Register.run!(
      email: generate(:email),
      password: password,
      password_confirmation: password
    )
  end
end
