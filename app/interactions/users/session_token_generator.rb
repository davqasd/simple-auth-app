# frozen_string_literal: true

module Users
  class SessionTokenGenerator < ActiveInteraction::Base
    record :user

    def execute
      generate_and_save_session_token
    end

    private

    def generate_and_save_session_token
      user.update(session_token: session_token)
      session_token
    end

    def session_token
      @session_token ||= Digest::SHA1.hexdigest(digest)
    end

    def digest
      "#{(Time.current.to_f * 1000).to_i}-#{user.id}-#{user.updated_at}"
    end
  end
end
