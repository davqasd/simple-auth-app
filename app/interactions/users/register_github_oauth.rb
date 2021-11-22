# frozen_string_literal: true

module Users
  class RegisterGithubOauth < ActiveInteraction::Base
    hash :auth_hash do
      string :provider
      string :uid
      hash :credentials do
        string :token
      end
      hash :info do
        string :nickname
        string :image
      end
    end

    attr_reader :user

    def execute
      provider.user = User.new unless provider.user
      update_provider

      provider.user
    end

    private

    def provider
      @provider ||= AuthProvider.find_or_create_by(
        provider: auth_hash[:provider],
        uid: auth_hash[:uid]
      )
    end

    def update_provider
      provider.update(
        token: auth_hash[:credentials][:token],
        data: auth_hash[:info]
      )
    end
  end
end
