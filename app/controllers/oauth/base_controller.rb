# frozen_string_literal: true

module Oauth
  class BaseController < ApplicationController
    protect_from_forgery with: :null_session

    private

    def auth_hash
      request.env['omniauth.auth'].to_hash.with_indifferent_access
    end
  end
end
