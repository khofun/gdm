class Accessor < ActiveRecord::Base  
  belongs_to :garage
  belongs_to :friend
  
  validates_presence_of :code
end
