class Garage < ActiveRecord::Base
    
  has_many :accessors, :dependent => :destroy

  validates_uniqueness_of :name
  validates_presence_of :name
  validates_length_of :name, minimum: 1
  validates_presence_of :location
  validates_length_of :location, minimum: 1
  validates_presence_of :master_code
  validates_length_of :master_code, minimum: 1
end
