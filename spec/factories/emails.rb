# frozen_string_literal: true

FactoryBot.define do
  sequence :email do |n|
    "mail#{n}@mail.en"
  end
end
