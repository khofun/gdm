json.array!(@accessors) do |accessor|
  json.extract! accessor, :id, :garage_id, :friend_id, :code
end
