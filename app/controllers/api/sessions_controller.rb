# frozen_string_literal: true

module Api
  class SessionsController < BaseController
    skip_before_action :authenticate_user!

    def create
      warden.authenticate(:api_password)
      return render json: { error: 'Invalid email/password' }, status: :unauthorized unless warden.authenticated?

      render json: { token: session['warden.user.default.key'] }
    end
  end
end
