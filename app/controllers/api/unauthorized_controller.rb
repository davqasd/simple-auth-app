# frozen_string_literal: true

module Api
  class UnauthorizedController < BaseController
    def index
      render json: {}, status: :unauthorized
    end
  end
end
