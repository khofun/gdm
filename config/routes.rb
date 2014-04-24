GarageDoorManager::Application.routes.draw do
  
  scope "api", defaults: {format: :json} do
    resources :posts
  end
  
  get '/xyz/:id/abcd', to: 'accessors#myfunc', defaults: {format: :json}
  get '/garages/:id/accessors', to: 'accessors#belongs_to_garage', defaults: {format: :json}
  get '/garages/:id/friends', to: 'accessors#friends_can_access_garage', defaults: {format: :json}
  get '/garages/:id/tobefriends', to: 'accessors#friends_cannot_access_garage', defaults: {format: :json}
  
  #following three lines are useless, since a better way is found
  #post '/garages/:garageId/friends/:friendId/accessors', to: 'accessors#post', defaults: {format: :json}
  #put '/garages/:garageId/friends/:friendId/accessors/:id', to: 'accessors#put', defaults: {format: :json}
  #delete '/garages/:garageId/friends/:friendId/accessors/:id', to: 'accessors#delete', defaults: {format: :json}
  
  
  resources :garages, :defaults => {format: :json} do
    resources :accessors, :defaults => {format: :json}
  end
  
  resources :friends, :defaults => {format: :json} do
    resources :accessors, :defaults => {format: :json}
  end
  
  resources :accessors, :defaults => {format: :json}
  
  root to: 'application#index'
end
