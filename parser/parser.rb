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



year = 700
$events = Array.new
$current_event = Event.new
$line = '0'



File.open('Extracted_Text.txt', 'r:utf-8').each_line do |line|

  if(/\d+\Z/.match(line))


  #At this point we have found content that is part of an event
  elsif(/\A\.(?<date>(\d+\s{1}\w+))/.match(line))
    data = /\A\.(?<date>(\d+\s{1}\w+))/.match(line)
    $current_event
    $events << $current_event
    $current_event = Event.new(year)
    $current_event.date = data[:date]
    $current_event.content =  line[data[:date].length + 3, (line.length - (data[:date].length + 4))] + ' '

  elsif(/\A\./.match(line))
    $events << $current_event
    $current_event = Event.new(year)
    $current_event.content =  line[1, line.length - 2] + ' '

  else
    $current_event.content = $current_event.content + line[0, line.length - 2] + ' '

  end

end


#now print the result of parsing
out_file = File.new('JSON.txt', 'w:utf-8')

$events.each do |event|
  out_file.print "{\n"
  out_file.print '  "Year" : "' + event.year.to_s + %Q[",\n]
  out_file.print '  "Date" : "' + event.date + %Q[",\n]
  out_file.print '  "Content" : "' + event.content + %Q[",\n]
  out_file.print '  "Location" : "' + %Q[",\n]
  out_file.print '  "Filter" : "' + %Q[",\n]
  out_file.print %Q[  "Citation" : "Distefano, Giovanni. L'atlante Storico Di Venezia. Venice, Italy: Supernova Edizioni srl, 2007. ] + event.page + %Q["\n]
  out_file.print "},\n"
end

