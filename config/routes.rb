Rails.application.routes.draw do
  devise_for :users
  get "pages/home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Admin routes for user management
  namespace :admin do
    resources :users, only: [:index, :new, :create, :edit, :update, :destroy]
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Mount letter_opener_web in development for browsing sent emails
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  # Debug route to show current session/user in development
  if Rails.env.development?
    get "/dev_session", to: "pages#dev_session"
    get "/dev_logout", to: "pages#dev_logout"
  end

  # Defines the root path route ("/")
  root "pages#home"
end
