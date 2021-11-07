# frozen_string_literal: true

module Api
  class SessionsController < ApplicationController
    def new
      render json: { error: 'Access Denied' }, status: :unprocessable_entity
    end

    def create
      warden.authenticate(:password)
      return render json: { error: 'Invalid email/password' }, status: :unauthorized unless warden.authenticated?

      render_token
    end

    def destroy
      warden.logout

      render json: { message: 'Successfully signed out!' }
    end

    private

    def render_token
      payload = {
        token: session['warden.user.default.key'],
        expires_at: nil
      }

      render(json: payload)
    end
  end
end
