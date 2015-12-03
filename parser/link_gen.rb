#File which reads the Json data produced by the atlas parser,
#compares it to the link file and then produces no data with
#to Encyclopedia events
#Author: August Beers

require 'json'
#file to output JSON with links
$linked_data = File.new('linked_data.txt', 'w:utf-8')

#array to contain regular expressions
$regex_link_array = Array.new

#read the link file to populate the regex array
File.open('Link_File.txt', 'r:utf-8').each_line do |line|
    link = nil
    if(/\s\s\s\s0:/.match(line))
        #do nothing
    elsif(/famiglia/.match(line))
        #6 is the offset from the tight in the link file to ignore the id
        #17 = 6 + the length of the word famiglia and one space
        link = Regexp.new(' ' + line[6, line.length - 17])
        $linked_data.print link
        $linked_data.print "\n"
        $regex_link_array << link
    else
        link = Regexp.new(' ' + line[6, line.length - 7])
        $linked_data.print link
        $linked_data.print "\n"
        $regex_link_array << link
    end
    
end

$hits = 0
if(false)
infos = JSON.parse( File.open("../data.json", 'r:utf-8').read ); nil

#iterate through the content of each event to search for links
infos['events'].each{|e|

    if(e["UID"].to_i % 100 == 0)
        puts e["UID"] 
    end
    #Iterate through the array of regEx generated from the link
    #file matching each regEx to the
    $regex_link_array.each do |link|
        
        if(!$hit_flip && link.match(e["Content"]))
            $hits += 1
        end   
    end
}

puts "hits: " + $hits.to_s
end
#close files
$linked_data.close