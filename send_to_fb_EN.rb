#!/usr/bin/env ruby
# encoding: UTF-8

require 'httpclient'
require 'firebase'
require 'json'
require 'active_support/all'
require 'pr_geohash'


SRC = "https://venicedata.firebaseio.com/"
KEY = ENV["FB_KEY"]
FB = Firebase::Client.new(SRC, KEY); nil
#This is where we delette the old data
#FB.delete('history')
infos = JSON.parse( File.open("data_EN.json", 'r:utf-8').read ); nil

infos['entries'].each{|e|
    tag = e['Caption']
    tag = tag.gsub(/\s\(.+\)/, '')
    tag = tag.gsub(/\*/, '')  
    tag = tag.gsub(/d’ /, 'D’')
    
    tag = tag.gsub(/ /, "_")
    tag = tag.gsub(/[^0-9a-zA-Z_]/, "")
    
    puts tag
    FB.update("history_encycl/" + tag, e)
}; nil

