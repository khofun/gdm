class CreateAccessors < ActiveRecord::Migration
  def change
    create_table :accessors do |t|
      t.references :garage, index: true
      t.references :friend, index: true
      t.string :code

      t.timestamps
    end
  end
end
