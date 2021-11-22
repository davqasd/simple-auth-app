# frozen_string_literal: true

Rails.application.routes.draw do
  root 'static#index'

  get 'auth/github/callback', to: 'oauth/github#create'
  get 'auth/github/redirect', to: 'oauth/github#redirect_to_authorize'

  namespace :api, constraints: { format: 'json' } do
    resource :sessions, only: %i[create] do
      collection do
        post :signup
      end
    end
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
