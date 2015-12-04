#File which reads the Json data produced by the atlas parser,
#compares it to the link file and then produces no data with
#to Encyclopedia events
#Author: August Beers

require 'json'


class Link
  def initialize()
      @reg_ex = nil
      @start = nil
      @end = nil
      @is_family = false
      @length = 0
  end  
    
  attr_accessor :reg_ex
  attr_accessor :start
  attr_accessor :end
  attr_accessor :length
  attr_accessor :is_family
    
end




#file to output JSON with links
$linked_data = File.new('linked_data.txt', 'w:utf-8')

#array to contain regular expressions
$regex_link_array = Array.new

$front_reg_ex = /(“|\s|‘|«|\[|\()/
$end_reg_ex = /(\s|,|.|”|:|’|»|\]|\))/


#read the link file to populate the regex array
File.open('Link_File.txt', 'r:utf-8').each_line do |line|
    link = nil
    if(/\s\s\s\s0:/.match(line))
        #do nothing
    elsif(/famiglia/.match(line))
        #6 is the offset from the tight in the link file to ignore the id
        #17 = 6 + the length of the word famiglia and one space
        link = Regexp.new($front_reg_ex.to_s[0, $front_reg_ex.to_s.length - 1] +
                      line[6, line.length - 17] +
                      $end_reg_ex.to_s[7, $end_reg_ex.to_s.length])
        $linked_data.print link
        $linked_data.print "\n"
        $regex_link_array << link
    else 
        link = Regexp.new($front_reg_ex.to_s[0, $front_reg_ex.to_s.length - 1] +
                          line[6, line.length - 7] + 
                          $end_reg_ex.to_s[7, $end_reg_ex.to_s.length])
        $linked_data.print link
        $linked_data.print "\n"
        $regex_link_array << link
    end
    
end



#if(false)
$hits = 0
infos = JSON.parse( File.open("../data.json", 'r:utf-8').read ); nil

#iterate through the content of each event to search for links
infos['events'].each{|e|

    if(e["UID"].to_i % 100 == 0)
        puts e["UID"] 
    end
    #Iterate through the array of regEx generated from the link
    #file matching each regEx to the
    $regex_link_array.each do |link|
        
        if(link.match(e["Content"]))
            $hits += 1
        end   
    end
}

puts "hits: " + $hits.to_s
#end
#close files
$linked_data.close



#graveyard
#concat test add ()!!!!!!!!
#stt = "[Jack:"
#test_reg = /Jack/ 
#puts /(“|\s|‘|«|\[|\()Jack(\s|,|.|”|:|’|»|\]|\))/
#test_concat = /(“|\s|‘|«|\[|\()Jack(\s|,|.|”|:|’|»|\]|\))/
#puts  test_concat.match(stt)
#regtest1 = Regexp.new($front_reg_ex.to_s[0, $front_reg_ex.to_s.length - 1] +
#                      test_reg.to_s[7, test_reg.to_s.length - 8] +
#                      $end_reg_ex.to_s[7, $end_reg_ex.to_s.length])

#puts regtest1
#puts  test_concat.match(stt)



#puts Regexp.new(/Ahole(f|g)/.to_s)



#puts /Ahole/.to_s + /(f|g)/.to_s
#puts /Ahole/.to_s[0,/Ahole/.to_s.length - 1] + /(f|g)/.to_s[7,/(f|g)/.to_s.length]
#puts Regexp.new(/Ahole/.to_s[0,/Ahole/.to_s.length - 1] + /(f|g)/.to_s[7,/(f|g)/.to_s.length])
#regtest2 = Regexp.new(/Ahole/.to_s[0,/Ahole/.to_s.length - 1] + /(f|g)/.to_s[7,/(f|g)/.to_s.length])
#puts regtest2.match(stt)

#ofsett test

#ofsett = 0
#st = "yo im a string yo dfasdf"
#match_d = /yo/.match(st)
#puts match_d.to_s.length
#ofsett = match_d.to_s.length
#st = st[match_d.end(0),st.length]
#puts match_d.begin(0) 
#puts match_d.end(0) 
#match_d = /yo/.match(st)
#puts match_d.begin(0) + ofsett
#puts match_d.end(0) + ofsett
#puts 'act st: 15'


#s = "AustinTexasDallasTexas"
#positions = s.enum_for(:scan, /Texas/).map { Regexp.last_match.begin(0) }
#puts positions
