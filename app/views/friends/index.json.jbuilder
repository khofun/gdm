json.array!(@friends) do |friend|
  json.extract! friend, :id, :first_name, :last_name, :phone_number
  json.url friend_url(friend, format: :json)
end
