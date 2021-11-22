# frozen_string_literal: true

class CreateAuthProviders < ActiveRecord::Migration[6.1]
  def change
    create_table :auth_providers do |t|
      t.string :provider, null: false
      t.string :uid, null: false
      t.string :token
      t.references :user, null: false, foreign_key: true
      t.jsonb :data

      t.timestamps
    end

    add_index :auth_providers, %i[uid provider], unique: true
  end
end
