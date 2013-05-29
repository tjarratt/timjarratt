class Post < ActiveRecord::Base
  attr_accessible :body, :created_at, :published_at, :title

  def published?
    @published_at >= Time.now
  end
end
