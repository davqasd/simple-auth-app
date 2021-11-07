# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :encrypted_password

      t.timestamps

      t.index :email, unique: true
    end
  end
end
