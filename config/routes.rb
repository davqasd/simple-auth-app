# frozen_string_literal: true

Rails.application.routes.draw do
  root 'static#index'

  namespace :api, constraints: { format: 'json' } do
    resource :sessions, only: %i[create]
    resources :users, only: [] do
      collection do
        get :my
      end
    end
  end

  get '*page', to: 'static#index', constraints: lambda { |req|
    !req.xhr? && req.format.html?
  }
end
