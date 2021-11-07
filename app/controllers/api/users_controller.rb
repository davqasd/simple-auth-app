# frozen_string_literal: true

module Api
  class UsersController < BaseController
    def my
      render json: current_user.to_json
    end
  end
end
