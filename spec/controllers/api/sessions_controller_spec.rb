# frozen_string_literal: true

RSpec.describe Api::SessionsController, type: :controller do
  let(:password) { 'password' }
  # TODO: improve rspec user creation
  let(:user) { generate_user(password) }

  describe '#create' do
    before { post :create, params: params }

    context 'when user is not signed in' do
      let(:params) { { email: user.email, password: password } }

      it 'returns token' do
        expect(body[:token]).to be_present
        expect(body[:token].is_a?(String)).to be_truthy
      end
    end

    context 'invalid password' do
      let(:params) { { email: user.email, password: 'invalid password' } }

      it 'returns token' do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
