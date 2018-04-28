/**
* Scripts for Happy Trails (xxxxx)
*
* authors: Jack Bosanquet, Joshua Bauer
* website: NA
*/

(function(){	
	$(document).ready(function() {
		// When the document has finished loading, load the file traillist.xml to populate the application with default trail data
		$.ajax({
			type: "GET" ,
			url: "./database/traillist.xml" ,
			dataType: "xml" ,
			success: function(xml) {
				// If the AJAX GET request is successful, loop through traillist.xml and locate all trail entries
				$(xml).find('trail').each(function(){
					var $trail = $(this);
					var trailId = $trail.find('Id').text();
					var imageURL = $trail.find('Image').text();
					var trailName = $trail.find('Name').text();
					var trailDescription = $trail.find('Description').text();
					// Output trail information as HTML and append to index.html for retrieval
					var tempHTML = '<a href="#trailInfo" data-transition="slide" data-role="button" class="test" id="Trail ' + trailId + '"><li><img src="' + imageURL + '"/><h3>' + trailName + '</h3><p>' + trailDescription + '</p></li></a>';
					$(".trailData" ).append($(tempHTML));
				});
			}
		});
		
		// Check to see if localStorage is supported by the browser
		if (Modernizr.localstorage) 
		{
			console.log("Local storage is supported by this browser");
			
			// Variable for temporarily storing the user's currently selected trail
			var selectedTrail = {};
				selectedTrail.name = "";
				selectedTrail.image = "";
				selectedTrail.description = "";
				selectedTrail.notes = "";
				selectedTrail.hazards = "";
				selectedTrail.length = "";
				selectedTrail.surface = "";
				selectedTrail.contact = "";
				selectedTrail.backpackingAllowed = "";
				selectedTrail.bicyclesAllowed = "";
				selectedTrail.fitnessTrail = "";
				selectedTrail.waterTrail = "";
				selectedTrail.trailStatus = "";
				selectedTrail.alternativeName = "";
			
			// Variable for temporarily storing historicalHikeData objects
			var favouritesList = [];
				
			var storedHikeHistory = [];
				
			// Retrieve user's favouritesList from localStorage
			var retrievedFavouriteList = (JSON.parse(localStorage.getItem('userFavouriteList')));
			
			// Check localStorage to see if the user has added any items to their favouritesList
			if ( localStorage.length == 2 ) 
			{
				$( '#hikeHistoryButton' ).show();
			}
			else 
			{
				$( '#hikeHistoryButton' ).hide();
				// Check localStorage to see if the user has added any items to their favouritesList
				if ( localStorage.length>2 )
				{
					$( '#hikeHistoryButton' ).show();
					$( '#favouritesButton' ).show();
				}
				else
				{
					// if( !retrievedFavouriteList ) 
					// {
						$( '#favouritesButton' ).hide();
					// }
				}
			}
	
			$( document ).on( 'pagebeforeshow', '#home', function()
			{
				if ( localStorage.length == 2 ) 
				{
					$( '#hikeHistoryButton' ).show();
				}
				else 
				{
					$( '#hikeHistoryButton' ).hide();
					// Check localStorage to see if the user has added any items to their favouritesList
					if ( localStorage.length>2 )
					{
						$( '#hikeHistoryButton' ).show();
						$( '#favouritesButton' ).show();
					}
					else
					{
						// if( !retrievedFavouriteList ) 
						// {
							$( '#favouritesButton' ).hide();
						// }
					}
				}
				
			
			});
	
			$(document).on('pagebeforeshow', '#hikeSelection', function(){
				$(document).on('click', '.test', function(){
					var tempTrailName = $(this).attr("id");
					var tempImageURL = $('.test img').attr("src");
					var tempTrailDescription = $(this).find('p').text();
					$('.trailInfoTitle' ).html(tempTrailName + " Information");
					$('.trailInfoFavourite').html(tempTrailName+" added to Favourites");
					$('.trailMapTitle').html(tempTrailName + " Map");
					
					selectedTrail.name = tempTrailName;
					selectedTrail.image = tempImageURL;
					selectedTrail.description = tempTrailDescription;
					selectedTrail.notes = "NO";
					// selectedTrail.hazards = "";
					// selectedTrail.length = "";
					// selectedTrail.surface = "";
					// selectedTrail.contact = "";
					// selectedTrail.backpackingAllowed = "";
					// selectedTrail.bicyclesAllowed = "";
					// selectedTrail.fitnessTrail = "";
					// selectedTrail.waterTrail = "";
					// selectedTrail.trailStatus = "";
					// selectedTrail.alternativeName = "";
					localStorage.setItem('yourTrails', JSON.stringify(selectedTrail));
					localStorage.setItem('yourHikeHistory', JSON.stringify(selectedTrail));
					$.each( selectedTrail, function( key, value )
					{
						
						// alert( key + ":" + value );
					});
				});
				
			});

			$(document).on('pagebeforeshow', '#news', function(){
				$(document).on('click', '#title', function(){
					
				});
			});
			
			$(document).on('pagebeforeshow', '#photos', function(){
				// Get the modal
				var modal = document.getElementById('myModal');

				// Get the image and insert it inside the modal - use its "alt" text as a caption
				var img = document.getElementById('img01');
				var modalImg = document.getElementById("modalUserImg");
				var captionText = document.getElementById("caption");
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
					captionText.innerHTML = this.alt;
				}
				
				var img = document.getElementById('img02');
				var modalImg = document.getElementById("modalUserImg");
				var captionText = document.getElementById("caption");
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
					captionText.innerHTML = this.alt;
				}
				
				var img = document.getElementById('img03');
				var modalImg = document.getElementById("modalUserImg");
				var captionText = document.getElementById("caption");
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
					captionText.innerHTML = this.alt;
				}
				
				var img = document.getElementById('img04');
				var modalImg = document.getElementById("modalUserImg");
				var captionText = document.getElementById("caption");
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
					captionText.innerHTML = this.alt;
				}
				
				var img = document.getElementById('img05');
				var modalImg = document.getElementById("modalUserImg");
				var captionText = document.getElementById("caption");
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
					captionText.innerHTML = this.alt;
				}
				
				var img = document.getElementById('img06');
				var modalImg = document.getElementById("modalUserImg");
				var captionText = document.getElementById("caption");
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
					captionText.innerHTML = this.alt;
				}
				
				var img = document.getElementById('img07');
				var modalImg = document.getElementById("modalUserImg");
				var captionText = document.getElementById("caption");
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
					captionText.innerHTML = this.alt;
				}
				
				var img = document.getElementById('img08');
				var modalImg = document.getElementById("modalUserImg");
				var captionText = document.getElementById("caption");
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
					captionText.innerHTML = this.alt;
				}
				
				var img = document.getElementById('img09');
				var modalImg = document.getElementById("modalUserImg");
				var captionText = document.getElementById("caption");
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
					captionText.innerHTML = this.alt;
				}
				
				var img = document.getElementById('img10');
				var modalImg = document.getElementById("modalUserImg");
				var captionText = document.getElementById("caption");
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
					captionText.innerHTML = this.alt;
				}
				
				var img = document.getElementById('img11');
				var modalImg = document.getElementById("modalUserImg");
				var captionText = document.getElementById("caption");
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
					captionText.innerHTML = this.alt;
				}
				
				var img = document.getElementById('img12');
				var modalImg = document.getElementById("modalUserImg");
				var captionText = document.getElementById("caption");
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
					captionText.innerHTML = this.alt;
				}
				
				var img = document.getElementById('img13');
				var modalImg = document.getElementById("modalUserImg");
				var captionText = document.getElementById("caption");
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
					captionText.innerHTML = this.alt;
				}
				
				var img = document.getElementById('img14');
				var modalImg = document.getElementById("modalUserImg");
				var captionText = document.getElementById("caption");
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
					captionText.innerHTML = this.alt;
				}
				
				var img = document.getElementById('img15');
				var modalImg = document.getElementById("modalUserImg");
				var captionText = document.getElementById("caption");
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
					captionText.innerHTML = this.alt;
				}

				// Get the <span> element that closes the modal
				var span = document.getElementsByClassName("close")[0];

				// When the user clicks on <span> (x), close the modal
				span.onclick = function() {
				  modal.style.display = "none";
				} 
			});
			
			$(document).on('pagebeforeshow', '#hikeHistory', function(){
				var retrievedTrails = (JSON.parse(localStorage.getItem('yourTrails')));
				var retrievedHikeHistory = (JSON.parse(localStorage.getItem('yourHikeHistory')));
				// Check to make sure there are no duplicate entries in historicTrailData
				$.each( retrievedTrails, function( key, value)
				{
					// var historyCheck = $('.historicTrailData').text().indexOf(retrievedTrails.name) > -1;
					if( retrievedTrails.name == value )
					// if(historyCheck == false)
					{
						var tempHTML2 = '<li><a href="#trailInfo" data-transition="slide" data-role="button" id="historic' + retrievedTrails.name + '" class="ui-btn ui-corner-all ui-mini test"><img src="' + retrievedTrails.image + '"/><h3>' + retrievedTrails.name + '</h3><p>' + retrievedTrails.description + '</p></a></li>';
						$(".historicTrailData" ).append($(tempHTML2));
					}
				});				
			});

			$(document).on('pagebeforeshow', '#favourites', function(){
				var retrievedFavouriteList = (JSON.parse(localStorage.getItem('userFavouriteList')));
				var retrievedTrails = (JSON.parse(localStorage.getItem('yourTrails')));
				// Check to make sure there are no duplicate entries in myFavouritesList
				// var favouritesCheck = $('.myFavouritesList').text().indexOf(retrievedFavouriteList.name) > -1;
				// if(favouritesCheck == false) 
				// {
					$.each(retrievedFavouriteList, function( index, value ) {
					  var favouritesCheck = $('.myFavouritesList').text().indexOf(retrievedFavouriteList[index].name) > -1;
					  if(favouritesCheck == false)
					  {
						var tempHTML = '<a href="#trailInfo" data-transition="slide" data-role="button" class="ui-btn ui-corner-all ui-mini test" id="favourite' + retrievedFavouriteList[index].name + '"><li><img src="' + retrievedFavouriteList[index].image + '"/><h3>' + retrievedFavouriteList[index].name + '</h3><p>' + retrievedFavouriteList[index].description + '</p></li></a>';
						$( ".myFavouritesList" ).append($(tempHTML));
						alert( index + ": " + retrievedFavouriteList[index].name + favouritesCheck );
					  }
					});
					// var tempHTML = '<a href="#trailInfo" data-transition="slide" data-role="button" class="ui-btn ui-corner-all ui-mini test" id="favourite' + retrievedTrails.name + '"><li><img src="' + retrievedTrails.image + '"/><h3>' + retrievedTrails.name + '</h3><p>' + retrievedTrails.description + '</p></li></a>';
					// $(".myFavouritesList" ).append($(tempHTML));
				// }
				
			});

			$(document).on('pagebeforeshow', '#search', function(){
				var retrievedTrails = (JSON.parse(localStorage.getItem('yourTrails')));
				$(document).on('click', '#findSearchCriteria', function(){
					var tempSearchCriteria = $('#searchCriteria').val();
					if(localStorage.length > 0){
						$.each( retrievedTrails, function( key, value) 
						{ 
							if( tempSearchCriteria == value )
							{
								
								// alert(value);
								var tempHTML = '<li><a href="#trailInfo" data-transition="slide" data-role="button" id="historic' + retrievedTrails.name + '" class="ui-btn ui-corner-all ui-mini test"><img src="' + retrievedTrails.image + '"/><h3>' + retrievedTrails.name + '</h3><p>' + retrievedTrails.description + '</p></a></li>';
								$('.searchResults').html("Result found!");
								$('.searchResults').append($(tempHTML));
								return (0>1)
							}
							else
							{
								$('.searchResults').html("Result not found");
								// alert(tempSearchCriteria +" != "+ value);
							}
						});
					}
					else
					{
						$('.searchResults').html("Result not found");
					}
				});

			});
			
			$(document).on('pagebeforeshow', '#trailInfo', function(){
				var retrievedTrails = (JSON.parse(localStorage.getItem('yourTrails')));
				var retrievedFavouriteList = (JSON.parse(localStorage.getItem('userFavouriteList')));
				$(document).on('click', '#myFavourite', function(){
					if(retrievedFavouriteList != null){
						favouritesList.push(retrievedTrails);
						localStorage.setItem('userFavouriteList', JSON.stringify(favouritesList));
						alert(favouritesList[0].name);
					}
					else {
						if( (jQuery.inArray(retrievedTrails.name, retrievedFavouriteList)) > -1 ){
							$('#myFavourite').hide();
							$('.trailInfoFavourite').html("");
						} 
						else {
							localStorage.setItem('userFavouriteList', JSON.stringify(retrievedTrails));
						}
					
					}
					
				});
			});
			
			$(document).on('pagebeforeshow', '#trailMap', function(){
				$(document).on('click', '#trailHazardMap', function(e){
					var posX = e.pageX;
					var posY = e.pageY;
					alert(posX+ ' , ' + posY);
				});
			});
				
		}
		// If the user's browser doesn't support localStorage, let them know
		else
		{
			$('.message').text("Unfortunately your browser doesn't support local storage. This is required for some features of the application to function correctly.");
			$('.message').show();
		}
		
	});
	
})();