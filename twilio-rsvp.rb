#!/usr/bin/env ruby
require 'twilio-ruby'

if ARGV.length != 1
  puts "usage: twilio-rsvp __NAME__"
  exit 1
end

client = Twilio::REST::Client.new('AC4714b3c4e87f4b12b8788df3e2ec1c09', 'eb61d078c89f17f290c459de1262707c')
client.account.sms.messages.create(
  :from => '+14155992671',
  :to => '+14158608430',
  :body => "#{ARGV[0]} has just RSVP'd!"
)
