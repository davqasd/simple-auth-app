# frozen_string_literal: true

class ApplicationController < ActionController::Base
  helper_method :current_user

  def warden
    request.env['warden']
  end

  def current_user
    warden.user
  end
end
