#.tif remover

require 'json'



out_file = File.new('no_tiff.json', 'w:utf-8')

infos = JSON.parse(File.open("linked_data.json", 'r:utf-8').read ); nil

removs = Array.new

infos['events'].each{|e|
    if(e['Image'])
        removs = Array.new
        
        e['Image'].each do |image|
            
            if(/\.tif/.match(image))
                removs << image
                
            end
        end
        removs.each do |rm|
            e['Image'].delete(rm) 
        end
        
    end
}


out_file.print JSON.generate(infos)

out_file.close

in_file = File.open("no_tiff.json", 'r:utf-8')
out_file = File.new('final_data.json', 'w:utf-8')

$resut = ""
in_file.each_line do |line|
    $result = line.gsub( /,"Image":\[\]/, "")
end

out_file.print $result

