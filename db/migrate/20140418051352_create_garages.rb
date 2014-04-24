class CreateGarages < ActiveRecord::Migration
  def change
    create_table :garages do |t|
      t.string :name
      t.string :location
      t.string :master_code
      t.string :state

      t.timestamps
    end
  end
end
