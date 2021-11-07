# frozen_string_literal: true

module Api
  class BaseController < ApplicationController
    protect_from_forgery with: :null_session

    include ErrorHandling

    before_action :authenticate_user!

    def json_response(data)
      render json: data
    end

    def authenticate_user!
      warden.authenticate!(:jwt)
    end
  end
end
