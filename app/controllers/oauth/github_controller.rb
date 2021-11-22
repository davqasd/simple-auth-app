# frozen_string_literal: true

module Oauth
  class GithubController < BaseController
    skip_before_action :verify_authenticity_token, only: :create

    def redirect_to_authorize
      redirect_to '/auth/github'
    end

    def create
      user = Users::RegisterGithubOauth.run!(auth_hash: auth_hash)
      request.env['warden'].set_user(user)

      redirect_to root_path(token: session['warden.user.default.key'])
    end
  end
end
