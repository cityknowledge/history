#File which defines the Encyclopedia Parsing Algorithm
#The algoritm reads each line of the encyclopedia text file. @ symbols have been inserted in this text file indicating the begging of an event by the
#pdf lib text extraction tool
#The algorithm also creats a link file which is a list of article captions. These strings are used to creat links by the link generator
#This algorithm does not create links for articles with "Vedi" another name in them
#Author: August Beers


#a class which defines each entry in the atlas
class Entry
    def initialize()
    @caption = ''
    @content = ''
    @page = ''
    @duplicate = 0    
    @id = 0
    end

    def getcleanlink
        link = caption.gsub(/\s\(.+\)/, '')
        link = link.gsub(/\*/, '')  
        link = link.gsub(/d’ /, 'D’')
        
        return link
    end
    
  attr_accessor :caption
  attr_accessor :content
  attr_accessor :page
  attr_accessor :id
  attr_accessor :duplicate

end




$connectors = [/d’/]

#array which contains entries
$entries = Array.new
$current_entry = Entry.new()
#initialize first page and year of text extraction
#note these value are one less than the actual starts
$current_page = '8'

$line = '0'
$current_id = 0

#$name_flip = false

#begin parse algorithm which populates the entries array
#Iterate accross each link of the encyclopedia text file
File.open('Encyclopedia_Text_File.txt', 'r:utf-8').each_line do |line|

  #if a number that is the only text on a line
    #look for page num ers
  if(/\A\d+\Z/.match(line))
    test_page = $current_page.to_i + 1
    if(line.to_i - test_page <= 4 && line.to_i - test_page > 0)
      $current_page = line[0, line.length - 1]

      puts $current_page
    end

    #At this point we have found content that is part of an entry

      #watch out for single uppercase letters on a line, they are not part of an entry
  elsif(/\A[A-Z]\Z/.match(line))
    #do nothing

      

      
  #Entry start
  elsif(/\A@(?<caption>([^,]+)),/.match(line))
    data = /\A@(?<caption>([^,]+)),/.match(line)
    #save the old entry
    $entries << $current_entry
    $current_id += 1
    $current_entry = Entry.new()
    $current_entry.id = $current_id
       
      
      
    #Look for special entries~
    #look for family names
    if(/\w+,\sfamiglia/.match(line))
      $current_entry.caption = data[:caption] + ' ' + 'famiglia'
        
    #look for people with a date of birth, death, or both within brackets    
    #Problems, Associazione,

    elsif (/\A@(?<caption>([^,]+)),(?<sir_name>((\s[[:upper:]]\S+|\s(d’|e|di|del|della|dei|degli|delle|dello|dell’|il))+))(,|\s\()/.match(line)) #&& 
        
        data = /\A@(?<caption>([^,]+)),(?<sir_name>((\s[[:upper:]]\S+|\s(d’|e|di|del|della|dei|degli|delle|dello|dell’|il))+))(,|\s\()/.match(line)
            $current_entry.caption =data[:sir_name][1, data[:sir_name].length] + ' ' + data[:caption]
    
            
    #other wise we just have a regular caption
    else
      $current_entry.caption = data[:caption]
    end #end special entries
     
        
        $current_entry.page = $current_page

    #if the line contains more information than just the tag it is content.
    if(line.length - (data[:caption].length + 3) > 0)
      tmp_content = line[data[:caption].length + 3, (line.length - (data[:caption].length + 4))] + ' '
      tmp_content = tmp_content.slice(0,1).capitalize + tmp_content.slice(1..-1)
      $current_entry.content =  tmp_content

    else
      $current_entry.content = ''
    end #end first content

        
            #check for duplicate
    $entries.each do |old|

        #if we have a duplicate print them into the same encyclopedia
        if(old.caption == $current_entry.caption)

            tmp =  old
            $entries.delete(old)
            if(tmp.duplicate == 0)
                tmp.content = '1.<br>' + tmp.content + 
                '<br><br>2.<br>' + $current_entry.content
                tmp.duplicate += 1
                $current_entry = tmp

            else
                tmp.content = tmp.content + '<br><br>' + (tmp.duplicate + 2).to_s + ".<br>" + $current_entry.content
                tmp.duplicate += 1
                $current_entry = tmp
            end #end if first duplicate
            
    end #end if duplicateend #end loop
        
  end #end caption match
        
  else

    $current_entry.content = $current_entry.content + line[0, line.length - 1] + ' '
  end

end


#add last event ot event list
$entries << $current_entry

#now print the result of parsing
out_file = File.new('data_EN.json', 'w:utf-8')
link_file = File.new('Link_File.txt', 'w:utf-8')
num = 0
out_file.print "{\n"
out_file.print '  "entries" : [' + "\n"

$entries.each do |entry|
  out_file.print "    {\n"
  out_file.print '      "Caption" : "' + entry.caption + %Q[",\n]
    
    if(!/( vedi|\Avedi| Vedi|\AVedi)/.match(entry.content[0, 60]))
      if(entry.id < 10)
          link_file.print  '    ' + entry.id.to_s + ':' + entry.getcleanlink + %Q[\n]
      elsif(entry.id < 100)
          link_file.print  '   ' + entry.id.to_s + ':' + entry.getcleanlink + %Q[\n]
      elsif(entry.id < 1000)
        link_file.print  '  ' + entry.id.to_s + ':' + entry.getcleanlink + %Q[\n]
      elsif(entry.id < 10000)
        link_file.print  ' ' + entry.id.to_s + ':' + entry.getcleanlink + %Q[\n]
      else
        link_file.print  entry.id.to_s + ':' + entry.getcleanlink + %Q[\n]
      end
    end
        
  out_file.print '      "Content" : "' + entry.content + %Q[",\n]
  out_file.print %q[    "Citation" : "Distefano, Giovanni. Enciclopedia storica di Venezia. Venice, Italy: Supernova Edizioni srl, 2011. ] + entry.page + %Q["\n]
  out_file.print "    },\n"
  num += 1
end

out_file.print "  ]\n"
out_file.print '}'

out_file.close
link_file.close
    
    
    
    #graveyard
    
    
    #Looking at multiple lines with name_flip -----------------------
    
    #reg ex:::: #(/\(.+\d+.+/.match(line)  && !/\(.+\d+.+ettari/.match(line)))
    
    #keep serching content to see if entry is a name
  #elsif($name_flip)
  #  if(/\(.+\d+.+/.match(line)  && !/\(.+\d+.+ettari/.match(line))
   #   $name_flip = false
   #   $current_entry.caption = $current_entry.caption + ' name!!!!!'  #data[:sir_name]
    #elsif(/\./.match(line))
     # $name_flip = false
    #end  
    
    
    #part 2--------------
        #the current event may still be a name that dosnt have its dob/dod 
    #vissuto 
    #elsif(/\A@(?<caption>([^,]+)),(?<sir_name>((\s[[:upper:]]\S+)+))(,|\s\()/.match(line))
        
        #flip the name flip to true check next line dob/dod
        #$name_flip = true