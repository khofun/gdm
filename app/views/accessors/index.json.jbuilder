json.array!(@accessors) do |accessor|
  json.extract! accessor, :id, :garage_id, :friend_id, :code
  json.url garage_url(accessor, format: :json)
end
