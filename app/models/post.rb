class Post < ActiveRecord::Base
  attr_accessible :title, :body, :created_at, :published_at

  def published?
    @published_at >= Time.now
  end
end
