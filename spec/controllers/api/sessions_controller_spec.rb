# frozen_string_literal: true

RSpec.describe Api::SessionsController, type: :controller do
  let(:password) { 'password' }
  # TODO: improve rspec user creation
  let(:user) { generate_user(password) }

  describe '#create' do
    subject { post :create, params: params }

    context 'when user is not signed in' do
      let(:params) { { email: user.email, password: password } }

      it 'returns token' do
        subject
        expect(body[:token]).to be_present
      end
    end
  end

  describe '#logout' do
    subject { delete :destroy }

    context 'when user is signed in' do
      before do
        sign_in user
      end

      it 'successful' do
        subject
        expect(response.successful?).to be_truthy
      end
    end
  end
end
