#!/usr/bin/env ruby
# encoding: UTF-8

require 'httpclient'
require 'firebase'
require 'json'
require 'active_support/all'
require 'pr_geohash'

MONTH = {
 :gennaio   =>  1,
 :febbraio  =>  2,
 :marzo     =>  3,
 :aprile    =>  4,
 :maggio    =>  5,
 :giugno    =>  6,
 :luglio    =>  7,
 :agosto    =>  8,
 :settembre =>  9,
 :ottobre   => 10,
 :novembre  => 11,
 :dicembre  => 12 
}

SRC = "https://venicedata.firebaseio.com/"
KEY = ENV["FB_KEY"]
FB = Firebase::Client.new(SRC, KEY); nil
#This is where we delette the old data
FB.delete('history')
infos = JSON.parse( File.open("data.json", 'r:utf-8').read ); nil

i = 0
infos['events'].each{|e|
  puts "  #{i+=1} UPDATE"
  month = 0
  if e['Date'].to_s.downcase =~ /(#{MONTH.keys.join('|')})/
    month = MONTH[$1].to_i
  end
  day = 0
  if e['Date'].to_s.downcase =~ /([0-9]+)/
    day = $1.to_i
  end
  e['timestamp'] = [
    "0000#{e['Year']}"[-4..-1],
    "00#{month}"[-2..-1],
    "00#{day}"[-2..-1],
    "000"
  ].join('.')
  FB.push("history", e)
}; nil

