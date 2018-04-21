/**
* Scripts for Happy Trails (xxxxx)
*
* authors: Jack Bosanquet, Joshua Bauer
* website: NA
*/

(function(){	
	$(document).ready(function() {
		// When the document has finished loading, load the file myData.xml to populate the application with default trail data
		$.get('myData.xml', function(d){
			// Function to find trail information from the myData.xml file
			$(d).find('trail').each(function(){
				var $trail = $(this); 
				var title = $trail.attr("title");
				var description = $trail.find('description').text();
				var imageurl = $trail.attr('imageurl');

				var html = '<a href="#trailInfo' + title + '" data-role="button" data-transition="slide" id="' + title + '"><li>';
					html +=	'<img src="' + imageurl + '" />';
					html +=	'<h3>' + title + '</h3>'
					html +=	'<p> ' + description + '</p>'
					html += '</li></a>';
				
				$('.trailData').append($(html));
				
			});
		});

		// 
		$(document).on('pagebeforeshow', '#hikeSelection', function(){
			/* $(document).on('click', '#title', function(){

			}); */
		});

		$(document).on('pagebeforeshow', '#news', function(){
			
		});
		
		$(document).on('pagebeforeshow', '#photos', function(){
			
		});
		
		$(document).on('pagebeforeshow', '#hikeHistory', function(){
			
		});

		$(document).on('pagebeforeshow', '#favourites', function(){
			
		});

		$(document).on('pagebeforeshow', '#search', function(){
			
		});
		
	});
	
})();