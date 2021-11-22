# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :encrypted_password

      t.timestamps
    end

    add_index :users, %i[email], unique: true, where: 'email IS NOT NULL'
  end
end
