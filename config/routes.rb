Rails.application.routes.draw do
  resources :restaurants, only: %i[index show] do
    resources :reviews, only: :create
  end
end
