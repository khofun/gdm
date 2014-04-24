json.array!(@accessors) do |accessor|
  json.extract! accessor, :accessor_id, :code, :friend_id, :first_name, :last_name, :phone_number
end
