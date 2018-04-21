$(function(){


//Sample XML
var xml = "<?xml version='1.0'?><traillist><trail><Name>Trail 1</Name><Notes>Blah some notes here</Notes><Hazards>List hazards here</Hazards><Image>http://via.placeholder.com/100x100</Image><Length>5.00</Length><Surface>Smooth</Surface><Contact>Some Guy - 0404111111</Contact><BackpackingAllowed>False</BackpackingAllowed><BicyclesAllowed>True</BicyclesAllowed><FitnessTrail>False</FitnessTrail><WaterTrail>False</WaterTrail><TrailStatus>Open</TrailStatus><AlternativeName>Awesome Trail</AlternativeName></trail><trail><Name>Trail 2</Name><Notes>Blah some notes here</Notes><Hazards>List hazards here</Hazards><Image>http://via.placeholder.com/100x100</Image><Length>3.00</Length><Surface>Rough</Surface><Contact>Some Guy - 0404111111</Contact><BackpackingAllowed>False</BackpackingAllowed><BicyclesAllowed>True</BicyclesAllowed><FitnessTrail>False</FitnessTrail><WaterTrail>True</WaterTrail><TrailStatus>Open</TrailStatus><AlternativeName>Killers Trail</AlternativeName></trail></traillist>";

//Parse the givn XML
var xmlDoc = $.parseXML( xml );
var $xml = $(xmlDoc);

  // Find Person Tag
var $trail = $xml.find("trail");

$trail.each(function(){

    $("#traillist" ).append('<a href="#" data-role="button"><li><img src="'+$(this).find('Image').text()+'"/><h3>'+$(this).find('Name').text()+'</h3><p>'+$(this).find('Notes').text()+'</p></li></a>');

});

});
