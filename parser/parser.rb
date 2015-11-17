#File which defines the Atlas Parsing Algorithm


class Event
  def initialize(year = '0')
    @year = year
    @date = ''
    @content = ''
    @location = ''
    @page = ''
  end

  attr_accessor :year
  attr_accessor :date
  attr_accessor :content
  attr_accessor :location
  attr_accessor :page

end


$events = Array.new
$current_event = Event.new
#initialize first page and year of text extraction
#note these value are one less than the actual starts
$current_page = '23'
$current_year = '400'

$line = '0'

#Boolean to control ratchet miss page numberings
$flip = true

#begin parse algorithm
File.open('AD_no_image_text.txt', 'r:utf-8').each_line do |line|

  #if a number that is the only text on a line
  if(/\A\d+\Z/.match(line))
    test_page = $current_page.to_i + 1

    if(test_page == line.to_i)
      $current_page = line[0, line.length - 1]

      #account fo ratchet page numbers
      if ($current_page == '258' && $flip == true)
        $current_page = '234'
        $flip = false

      elsif($current_page == '524' && $flip == true)
        $current_page = '502'
        $flip = false

      elsif($current_page == '258')
        $flip = true

      end
      puts $current_page


    elsif(line.to_i - $current_year.to_i < 40 && line.to_i - $current_year.to_i > 0 )
      $current_year = line[0, line.length - 1]

    end

    #puts $current_year

  #At this point we have found content that is part of an event

  #Event start with a date
  elsif(/\A\.(?<date>((\d+\s{1}\w+)|(\w+))):/.match(line))
    data = /\A\.(?<date>((\d+\s{1}\w+)|(\w+))):/.match(line)
    $current_event
    $events << $current_event
    $current_event = Event.new($current_year)
    $current_event.date = data[:date]
    $current_event.page = $current_page

    #if the line contains more information than just the date it is content.
    if(line.length - (data[:date].length + 3) > 0)
        tmp_content = line[data[:date].length + 3, (line.length - (data[:date].length + 4))] + ' '
        tmp_content = tmp_content.slice(0,1).capitalize + tmp_content.slice(1..-1)
        $current_event.content =  tmp_content

    else
      $current_event.content = ''
    end

  #Event start without a date
  elsif(/\A\./.match(line))

    $events << $current_event
    $current_event = Event.new($current_year)
    $current_event.page = $current_page
      
      tmp_content = line[1, line.length - 2] + ' '
      tmp_content = tmp_content.slice(0,1).capitalize + tmp_content.slice(1..-1)
      $current_event.content = tmp_content

  #mid event content
  else

    if((!/([[:graph:]]+)\s([[:graph:]]+)\s([[:graph:]]+)\Z/.match(line)))
      #puts $current_page
      #puts line
    end

    $current_event.content = $current_event.content + line[0, line.length - 1] + ' '

  end

end


#add last event ot event list
$events << $current_event

#now print the result of parsing
out_file = File.new('JSON.txt', 'w:utf-8')
num = 0
out_file.print "{\n"
out_file.print '  "events: ["' + "\n"

$events.each do |event|
  out_file.print "    {\n"
  out_file.print '      "Year" : "' + event.year + %Q[",\n]
  out_file.print '      "Date" : "' + event.date + %Q[",\n]
  out_file.print '      "Content" : "' + event.content + %Q[",\n]
  out_file.print '      "Location" : "' + %Q[",\n]
  out_file.print '      "Filter" : "' + %Q[",\n]
  out_file.print '      "UID" : "' + num.to_s + %Q[",\n]  
  out_file.print %Q[      "Citation" : "Distefano, Giovanni. L'atlante Storico Di Venezia. Venice, Italy: Supernova Edizioni srl, 2007. ] + event.page + %Q["\n]
  out_file.print "    },\n"
    num += 1
end

out_file.print "  ]\n"
out_file.print '}'

