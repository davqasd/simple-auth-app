# frozen_string_literal: true

module Api
  class UnauthorizedController < BaseController
    skip_before_action :authenticate_user!

    def index
      render json: {}, status: :unauthorized
    end
  end
end
