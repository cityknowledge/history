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
        link = Regexp.new(line[6, line.length - 17])
        $linked_data.print link
        $linked_data.print "\n"
    else
        link = Regexp.new(line[6, line.length - 7])
        $linked_data.print link
        $linked_data.print "\n"
    end
    
end


infos = JSON.parse( File.open("../data.json").read ); nil

#infos['events'].each{|e|
    
    
 #   }


#close files
$linked_data.close