Rails.application.routes.draw do

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'static_pages#home'

  # Static Pages
  get 'static_pages/home'
  get '/signup'           => 'static_pages#signup'
  get '/trending'         => 'static_pages#trending'
  get '/portfolio'        => 'static_pages#portfolio'
  get '/search'           => 'static_pages#search'
  get '/history'          => 'static_pages#history'

  # User
  post '/users'           => 'users#create'

  # Sessions
  post '/sessions'        => 'sessions#create'
  get '/authenticated'    => 'sessions#authenticated'
  delete '/sessions'      => 'sessions#destroy'

  # Portfolio
  post '/addToPortfolio'  => 'portfolios#add'

end
