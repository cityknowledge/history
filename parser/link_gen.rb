#File which reads the Json data produced by the atlas parser,
#compares it to the link file and then produces no data with
#to Encyclopedia events
#Author: August Beers

require 'json'


class Link
  def initialize()
      @reg_ex = nil
      @text = nil
      @start = nil
      @end = nil
      @is_family = false
      @length = 0
  end  
    #method which checks to see if two links overlap based on
    #their start and end
    def overlap(compare)
        if((@start <= compare.end && @start >= compare.start) ||
                (@end <= compare.end && @end >= compare.start) ||
                    (compare.end  <= @end  && compare.end >= @start) ||
                        (compare.start  <= @end  && compare.start >= @start))
            return true
        else
            return false
        end
    end
    
  attr_accessor :reg_ex
  attr_accessor :start
  attr_accessor :end
  attr_accessor :length
  attr_accessor :is_family
  attr_accessor :text
    
end




#file to output JSON with links
$info = File.new('link_process_info.txt', 'w:utf-8')

#file to output JSON with links
$linked_data = File.new('linked_data.json', 'w:utf-8')

#array to contain regular expressions
$regex_link_array = Array.new

$front_reg_ex = /(“|\s|‘|«|\[|\()/
$end_reg_ex = /(\s|,|\.|”|:|’|»|\]|\))/


#read the link file to populate the regex array
File.open('Link_File.txt', 'r:utf-8').each_line do |line|
    link = nil
    if(/\s\s\s\s0:/.match(line))
        #do nothing
    elsif(/famiglia/.match(line))
        #6 is the offset from the start of lines in the link file to ignore the id
        #17 = 6 + the length of the word famiglia and one space
        link = Regexp.new($front_reg_ex.to_s[0, $front_reg_ex.to_s.length - 1] +
                      "(?<link>" + line[6, line.length - 17] + ")" +
                      $end_reg_ex.to_s[7, $end_reg_ex.to_s.length])
        $info.print link
        $info.print "\n"
        $regex_link_array << link
    else 
        link = Regexp.new($front_reg_ex.to_s[0, $front_reg_ex.to_s.length - 1] +
                          "(?<link>" + line[6, line.length - 7] +  ")" +
                          $end_reg_ex.to_s[7, $end_reg_ex.to_s.length])
        $info.print link
        $info.print "\n"
        $regex_link_array << link
    end
    
end



#if(false)
$link_hit_groups = Array.new

infos = JSON.parse(File.open("data_img.json", 'r:utf-8').read ); nil

#iterate through the content of each event to search for links
infos['events'].each{|e|
    
    if(e["UID"].to_i % 100 == 0)
        puts e["UID"] 
    end
    
    link_array = Array.new
    #Iterate through the array of regEx generated from the link
    #file matching each regEx to the content of events
    $regex_link_array.each do |link|
        
        if(link.match(e["Content"]))
            data = link.match(e["Content"])
            new_link = Link.new
            new_link.text = data[:link]
            new_link.start =  data.begin(:link)
            new_link.end = data.end(:link)
            new_link.length = new_link.end - new_link.start

            link_array << new_link
        end   
    end
    $link_hit_groups << link_array
}


$clean_link_hit_groups = Array.new

$ID = 1
$junk_flip = false

#begin length priority algoritm to eliminate overlapp
#first we must iterate accross each array of links, each array corrisponds directly to an event in the atlas
$link_hit_groups.each do |group|
    #Array to hold non overlapping links for each event
    link_array = Array.new
    
    #if there are links in this event
    if(group.length > 0)    
        #now iterate through each link in the current group
        group.each do |link|
            
            #if there are already links in this non-overlapping link array 
            #check to see if they overlapp with the new link
            if(link_array.length > 0)
                #iterate accross each link that is already in the non overlapping group
                link_array.each do |link_in_group|
                    #if the new link overlaps determine to insert or not
                    if(link.overlap(link_in_group))
                        if(link.length > link_in_group.length)
                            link_array.delete(link_in_group)
                        elsif(link.length < link_in_group.length)
                            $junk_flip = true
                        else
                            link_array.delete(link_in_group)
                        end
                    end #end if overlap  
                end #end link overlap iteration
                
                #if the new link is not a junk link(short overlapp) insert it
                if(!$junk_flip)
                    link_array << link
                end
                $junk_flip = false
                
            #there are no links in this link array so just add the first one
            else
                link_array << link        
            end#end if link_array contains links
            
        end #end link insertion iteration
        $clean_link_hit_groups << link_array
        $ID += 1
    
    #if there are no links in this event just add an empty array
    else
        $clean_link_hit_groups << link_array
        $ID += 1
    end #end if group.length > 0
    
end #end group array iteration

$hits = 0
$ID = 0

#Now iterate trhgoug events inserting the link meta characters where aproipriate
infos['events'].each{|e|

    $info.print "Begin block #" + $ID.to_s + "###################################\n"
    $clean_link_hit_groups[$ID] = $clean_link_hit_groups[$ID].sort_by &:start
    $clean_link_hit_groups[$ID] = $clean_link_hit_groups[$ID].reverse
    #iterate accross each group inserting links into the json
    $clean_link_hit_groups[$ID].each do |link|
        #insert link
        $info.print link.text + "[" + link.start.to_s +  ":" +  link.end.to_s + "]\n"   
        e["Content"] = e["Content"].insert(link.end, '#')
        e["Content"] = e["Content"].insert(link.start, '@')
        #inciment matches
        $hits += 1
    end
    
    $info.print "End block #" + $ID.to_s + "###################################\n"
    $ID += 1
}


$linked_data.print JSON.generate(infos)

puts "hits: " + $hits.to_s
#end
#close files
$linked_data.close
$info.close


#graveyard



#overlapp test

#test_link1 = Link.new
#test_link1.start = 4
#test_link1.end = 8
#test_link2 = Link.new
#test_link2.start = 2
#test_link2.end = 4
#test_link3 = Link.new
#test_link3.start = 8
#test_link3.end = 10
#test_link4 = Link.new
#test_link4.start =  1
#test_link4.end = 3
#test_link5 = Link.new
#test_link5.start = 4
#test_link5.end = 8
#
#test_link6 = Link.new
#test_link6.start = 5
#test_link6.end = 6
#
#test_link7 = Link.new
#test_link7.start = 3
#test_link7.end = 9
#
#test_link8 = Link.new
#test_link8.start = 9
#test_link8.end = 10
#
#puts test_link1.overlap(test_link2)
#puts test_link1.overlap(test_link3)
#puts test_link1.overlap(test_link4)
#puts test_link1.overlap(test_link8)
#puts test_link1.overlap(test_link5)
#puts test_link3.overlap(test_link1)
#
#puts test_link1.overlap(test_link6)
#puts test_link1.overlap(test_link7)



#concat capture test
#stringttt = "yo im a string yo"
#test4 = /(?<link>yo)/
#puts test4.match(stringttt)
#puts test4.to_s
#test5 = Regexp.new("(?<link>yo)")
#puts test5.match(stringttt)
#puts test5.to_s






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
