# frozen_string_literal: true

RSpec.describe Api::UsersController, type: :controller do
  let(:password) { 'password' }
  # TODO: improve rspec user creation
  let(:user) { generate_user(password) }
  let(:token) { Users::JsonWebToken.encode(user.id) }

  describe '#my' do
    before do
      request.headers.merge! headers
      get :my
    end

    let(:headers) { { Authorization: "Bearer #{token}" } }

    it 'returns current user' do
      expect(body[:id]).to eq(user.id)
    end
  end
end
