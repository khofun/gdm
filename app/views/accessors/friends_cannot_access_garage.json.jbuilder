json.array!(@friends) do |friend|
  json.extract! friend, :friend_id, :first_name, :last_name, :phone_number  
end
