json.array!(@garages) do |garage|
  json.extract! garage, :id, :name, :location, :master_code, :state
  json.url garage_url(garage, format: :json)
end
