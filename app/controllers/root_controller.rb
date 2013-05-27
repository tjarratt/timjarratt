class RootController < ApplicationController
  def resume
    path = [Rails.public_path, 'tim-jarratt.pdf'].join('/')
    send_file(path, :type => 'application/pdf', :disposition => 'inline')
  end
end
