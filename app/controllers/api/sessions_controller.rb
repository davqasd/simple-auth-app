# frozen_string_literal: true

module Api
  class SessionsController < BaseController
    skip_before_action :authenticate_user!

    def create
      warden.authenticate(:api_password)
      return render json: { error: 'Invalid email/password' }, status: :unauthorized unless warden.authenticated?

      render json: { token: session['warden.user.default.key'] }
    end

    def signup
      outcome = Users::Register.run(signup_params)
      return render json: outcome.errors.full_messages.to_json, status: :forbidden unless outcome.valid?

      request.env['warden'].set_user(outcome.result)

      render json: { token: session['warden.user.default.key'] }
    end

    private

    def signup_params
      params.require(:session).permit(:email, :password, :password_confirmation)
    end
  end
end
