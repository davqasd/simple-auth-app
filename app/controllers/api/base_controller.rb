# frozen_string_literal: true

module Api
  class BaseController < ApplicationController
    protect_from_forgery with: :null_session

    include ErrorHandling

    respond_to :json

    def json_response(data)
      render json: data
    end
  end
end
