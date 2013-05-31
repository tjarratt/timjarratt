IllegalToaster::Application.routes.draw do
  devise_for :admins

  root :to => 'root#index'

  resource :posts

  match '/blog' => 'posts#index'
  match '/cv' => 'root#cv'
  match '/resume' => 'root#resume'
  match '/projects' => 'root#projects'
end
