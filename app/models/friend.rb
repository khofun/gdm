class Friend < ActiveRecord::Base
        
  has_many :accessors, :dependent => :destroy

  validates_presence_of :first_name
  validates_length_of :first_name, minimum: 1
end
