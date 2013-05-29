require 'test_helper'

class PostTest < ActiveSupport::TestCase
  test 'not yet published?' do
    post = Post.new(:published_at => Time.now + 5)
    assert_false( post.published? )
  end

  test 'already published' do
    post = Post.new(:published_at => Time.now - 5)
    assert( post.published? )
  end
end
