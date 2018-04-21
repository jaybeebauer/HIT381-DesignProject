$(document).ready(function(){
   $.ajax({
    type: "GET" ,
    url: "./database/traillist.xml" ,
    dataType: "xml" ,
    success: function(xml) {

    //but if it's multible items then loop
    $(xml).find('trail').each(function(){
      $("#traillist" ).append('<a href="#Trail'+$(this).find('Id').text()+'" data-role="button"><li><img src="'+$(this).find('Image').text()+'"/><h3>'+$(this).find('Name').text()+'</h3><p>'+$(this).find('Notes').text()+'</p></li></a>');
    });
    }
});
});
