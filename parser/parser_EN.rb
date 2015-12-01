#File which defines the Encyclopedia Parsing Algorithm


class Entry
  def initialize()
    @caption = ''
    @content = ''
    @page = ''
    @id = 0
  end

  attr_accessor :caption
  attr_accessor :content
  attr_accessor :page
  attr_accessor :id

end

#entries
$entries = Array.new
$current_entry = Entry.new()
#initialize first page and year of text extraction
#note these value are one less than the actual starts
$current_page = '8'

$line = '0'
$current_id = 0

#flip which lets the algorithm check for dates on multiple lines
$name_flip = false


#begin parse algorithm
File.open('EN_with_@.txt', 'r:utf-8').each_line do |line|

  #if a number that is the only text on a line
  if(/\A\d+\Z/.match(line))
    test_page = $current_page.to_i + 1
    if(line.to_i - test_page <= 4 && line.to_i - test_page > 0)
      $current_page = line[0, line.length - 1]

      puts $current_page
    end

    #At this point we have found content that is part of an entry

  #watch out for single uppercase letters on a line
  elsif(/\A[A-Z]\Z/.match(line))
    #do nothing

  #keep serching content to see if entry is a name
  elsif($name_flip)
    if(/\(.+\d+.+/.match(line)  && !/\(.+\d+.+ettari/.match(line))
      $name_flip = false
      $current_entry.caption = $current_entry.caption + ' ' + 'name'
      puts line + ':' + $current_entry.caption
    elsif(/\./.match(line))
      $name_flip = false
    end

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
    elsif (/\(.+\d+.+/.match(line)  && !/\(.+\d+.+ettari/.match(line))
      $current_entry.caption = data[:caption] + ' ' + 'name'
    else
        #this may still be a name that dosnt have its dob/dod
        #flip the name flip to true check next line dob/dod
      $name_flip = true
      $current_entry.caption = data[:caption]
    end

    $current_entry.page = $current_page

    #if the line contains more information than just the tag it is content.
    if(line.length - (data[:caption].length + 3) > 0)
      tmp_content = line[data[:caption].length + 3, (line.length - (data[:caption].length + 4))] + ' '
      tmp_content = tmp_content.slice(0,1).capitalize + tmp_content.slice(1..-1)
      $current_entry.content =  tmp_content

    else
      $current_entry.content = ''
    end

  else

    $current_entry.content = $current_entry.content + line[0, line.length - 1] + ' '
  end

end


#add last event ot event list
$entries << $current_entry

#now print the result of parsing
out_file = File.new('JSON_EN.txt', 'w:utf-8')
link_file = File.new('Link_File.txt', 'w:utf-8')
num = 0
out_file.print "{\n"
out_file.print '  "entries" : [' + "\n"

$entries.each do |entry|
  out_file.print "    {\n"
  out_file.print '      "Caption" : "' + entry.caption + %Q[",\n]
  if(entry.id < 10)
    link_file.print  '    ' + entry.id.to_s + ':' + entry.caption + %Q[\n]
  elsif(entry.id < 100)
    link_file.print  '   ' + entry.id.to_s + ':' + entry.caption + %Q[\n]
  elsif(entry.id < 1000)
    link_file.print  '  ' + entry.id.to_s + ':' + entry.caption + %Q[\n]
  elsif(entry.id < 10000)
    link_file.print  ' ' + entry.id.to_s + ':' + entry.caption + %Q[\n]
  else
    link_file.print  entry.id.to_s + ':' + entry.caption + %Q[\n]
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