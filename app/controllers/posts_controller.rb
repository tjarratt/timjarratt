class PostsController < ApplicationController
  before_filter :authenticate_admin!, :only => [:new, :edit, :update, :destroy]
  before_filter :fetch_resource, :only => [:edit, :update, :show, :destroy]

  def index
    @posts = Post.order('created_at').paginate(:page => params[:page], :per_page => 5)
  end

  def new
    @post = Post.new
  end

  def update
    @post.update(params[:post])
  end

  def destroy
    @post.destroy
  end

  private
  def fetch_resource
    @post = Post.get(params[:id])
  end
end
