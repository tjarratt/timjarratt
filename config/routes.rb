IllegalToaster::Application.routes.draw do
  root :to => 'root#index'
  match '/cv' => 'root#cv'
  match '/resume' => 'root#resume'
  match '/projects' => 'root#projects'
end
