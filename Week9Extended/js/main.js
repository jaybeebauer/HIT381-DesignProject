/**
* Scripts for Happy Trails (xxxxx)
*
* authors: Jack Bosanquet, Joshua Bauer
* website: NA
*/

( function()
{
	$( document ).ready( function()
	{

		//This function sets the variable onboardComplete in localStorage to 1 once user has completed the onboarding steps, will then skip it each time a user runs the app
		//delete localStorage.onboardComplete ; //This is for testing to see first page again
		//console.log(localStorage.onboardComplete);
		var onboard = localStorage.onboardComplete !== undefined;
		if (onboard) $.mobile.navigate("#home");
		$("#registrationSubmit").click( function()
			{
				localStorage.setItem('onboardComplete', 1)
				$.mobile.navigate("#home", {transition:"slide"});
			}
		);

		$("#onboard1").swipeleft(function() {
			$.mobile.changePage("#onboard2", {transition:"slide"});
		});
		
		$("#onboard2").swiperight(function() {
			$.mobile.changePage("#onboard1", {transition:"slide", reverse:"true"});
		});
		
		$("#onboard2").swipeleft(function() {
			$.mobile.changePage("#onboard3", {transition:"slide"});
		});
		
		$("#onboard3").swiperight(function() {
			$.mobile.changePage("#onboard2", {transition:"slide", reverse:"true"});
		});
		
		$("#onboard3").swipeleft(function() {
			$.mobile.changePage("#onboard4", {transition:"slide"});
		});
		
		$("#onboard4").swiperight(function() {
			$.mobile.changePage("#onboard3", {transition:"slide", reverse:"true"});
		});

		// When the document has finished loading, load the file traillist.xml to populate the application with default trail data
		$.ajax({
			type: "GET" ,
			url: "./database/traillist.xml" ,
			dataType: "xml" ,
			success: function( xml ) {
				// If the AJAX GET request is successful, loop through traillist.xml and locate all trail entries
				$( xml ).find( 'trail' ).each( function(){
					var $trail = $( this );
					var trailId = $trail.find( 'Id' ).text();
					var imageURL = $trail.find( 'Image' ).text();
					var trailName = $trail.find( 'Name' ).text();
					var trailDescription = $trail.find( 'Description' ).text();
					var trailNotes = $trail.find( 'Notes' ).text();
					var trailHazards = $trail.find( 'Hazards' ).text();
					var trailLength = $trail.find( 'Length' ).text();
					var trailSurface = $trail.find( 'Surface' ).text();
					var trailContact = $trail.find( 'Contact' ).text();
					var trailBackpackingAllowed = $trail.find( 'BackpackingAllowed' ).text();
					var trailBicyclesAllowed = $trail.find( 'BicyclesAllowed' ).text();
					var trailFitnessTrail = $trail.find( 'FitnessTrail' ).text();
					var trailWaterTrail = $trail.find( 'WaterTrail' ).text();
					var trailTrailStatus = $trail.find( 'TrailStatus' ).text();
					var trailAlternativeName = $trail.find( 'AlternativeName' ).text();
					// Output trail information as HTML and append to index.html for retrieval
					var tempHTML = '<a href="#trailInfo" data-transition="slide" data-role="button" class="test" id="Trail ' + trailId + '"><li><img src="' + imageURL + '"/><h3>' + trailName + '</h3><p>' + trailDescription + '</p></li></a>';
					var hiddenTempHTML = '<p style="visibility: hidden">'+ trailNotes + trailHazards+'</p>'
					$( ".trailData" ).append( $( tempHTML ) );
					// $( ".trailData" ).append( $( hiddenTempHTML ) );
				});
			}
		});

		// Check to see if localStorage is supported by the browser
		if ( Modernizr.localstorage )
		{
			console.log( "Local storage is supported by this browser" );

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

			// Variable for temporarily storing the user's favourited trails
			var favouritesList = [];

			// Variable for temporarily storing historicTrailData objects
			var storedHikeHistory = [];

			// Variable for temporarily storing hazards posted to the trailMap screen
			var storedHazardList = [];

			// Retrieve user's favouritesList from localStorage
			var retrievedFavouriteList = ( JSON.parse( localStorage.getItem( 'userFavouriteList' ) ) );

			if (localStorage.getItem('userFavouriteList') === null)
			{
				$( '#favouritesButton' ).hide();
			}
			else
			{
				$( '#favouritesButton' ).show();
			}

			if (localStorage.getItem('yourHikeHistory') === null)
			{
				$( '#hikeHistoryButton' ).hide();
			}
			else
			{
				$( '#hikeHistoryButton' ).show();
			}

			$( document ).on( 'pagebeforeshow', '#home', function()
			{
				if (localStorage.getItem('userFavouriteList') === null)
				{
					$( '#favouritesButton' ).hide();
				}
				else
				{
					$( '#favouritesButton' ).show();
				}

				if (localStorage.getItem('yourHikeHistory') === null)
				{
					$( '#hikeHistoryButton' ).hide();
				}
				else
				{
					$( '#hikeHistoryButton' ).show();
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
					selectedTrail.notes = "";
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

					});
				});

			});

			$(document).on('pagebeforeshow', '#news', function(){

				var newssubmit = document.getElementById('newssubmit');

				newssubmit.onclick = function(){
					var newstext = document.getElementById('shareText').value;
					$('#newslist li:eq(0)').before('<li><h4>You User says:</h4><p>' + newstext + '</p></li>');
					$('input[id=shareText').val('');
					$( "#newslist" ).listview( "refresh" );
				}

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
				$(".historicTrailData" ).html("");
				// Check to make sure there are no duplicate entries in historicTrailData
				$.each( retrievedHikeHistory, function( index, value)
				{
					// var historyCheck = $('.historicTrailData').text().indexOf(retrievedHikeHistory[index].name) > -1;
					// alert(retrievedHikeHistory[index].name);
					// if( retrievedHikeHistory[index].name )
					// {
						// if(historyCheck == false)
						// {
							var tempHTML2 = '<li><a href="#trailInfo" data-transition="slide" data-role="button" id="historic' + retrievedHikeHistory[index].name + '" class="ui-btn ui-corner-all ui-mini test"><img src="' + retrievedHikeHistory[index].image + '"/><h3>' + retrievedHikeHistory[index].name + '</h3><p>' + retrievedHikeHistory[index].description + '</p></a></li>';
							$(".historicTrailData" ).append($(tempHTML2));
						// }
					// }
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
						// alert( index + ": " + retrievedFavouriteList[index].name + favouritesCheck );
					  }
					});

					/* if(localStorage.getItem('userFavouriteList') != null )
					{
						$.each( retrievedFavouriteList, function( index, value)
						{
							if(retrievedFavouriteList[index].name == retrievedTrails.name )
							{
								var tempHTML = '<a href="#trailInfo" data-transition="slide" data-role="button" class="ui-btn ui-corner-all ui-mini test" id="favourite' + retrievedFavouriteList[index].name + '"><li><img src="' + retrievedFavouriteList[index].image + '"/><h3>' + retrievedFavouriteList[index].name + '</h3><p>' + retrievedFavouriteList[index].description + '</p></li></a>';
								$( ".myFavouritesList" ).append($(tempHTML));
								alert(retrievedFavouriteList[index].name);
								// var posX = retrievedHazardList[index].xCoord;
								// var posY = retrievedHazardList[index].yCoord;
								// var tempHazName = retrievedHazardList[index].hazardName;
								// var tempHazDet = retrievedHazardList[index].hazardDetails;
								// var tempID = tempHazName+"Overlay";
								// var tempHTML = '<div id="'+tempID+'" class="hazardOverlay" style="position: absolute; top:'+posY+'px; left:'+posX+'px"><img src="./img/mapOverlayElement.png"/></div>';
								// $( ".tempOverlay" ).before($(tempHTML));
								// $( "#"+tempID ).css({'position': 'absolute', 'top':posY, 'left':posX});
							} */
							// else
							// {
								// $(".hazardOverlay").remove();
							// }

						// });

					// }

					// var tempHTML = '<a href="#trailInfo" data-transition="slide" data-role="button" class="ui-btn ui-corner-all ui-mini test" id="favourite' + retrievedTrails.name + '"><li><img src="' + retrievedTrails.image + '"/><h3>' + retrievedTrails.name + '</h3><p>' + retrievedTrails.description + '</p></li></a>';
					// $(".myFavouritesList" ).append($(tempHTML));
				// }

			});

			$(document).on('pagebeforeshow', '#trailInfo', function(){
				var retrievedTrails = (JSON.parse(localStorage.getItem('yourTrails')));
				var retrievedFavouriteList = (JSON.parse(localStorage.getItem('userFavouriteList')));
				var retrievedHikeHistory = (JSON.parse(localStorage.getItem('yourHikeHistory')));
				if(retrievedHikeHistory != null)
				{
					// $('.trailInfoTitle' ).html(retrievedHikeHistory.name + " Information");
					storedHikeHistory.push(retrievedHikeHistory);
					localStorage.setItem('yourHikeHistory', JSON.stringify(storedHikeHistory));
					// alert(retrievedHikeHistory.name);
				}
				else
				{
					if( (jQuery.inArray(retrievedTrails.name, retrievedHikeHistory)) != -1 ){
						$('#myFavourite').hide();
						$('.trailInfoFavourite').html("");
					}
					else {
						localStorage.setItem('yourHikeHistory', JSON.stringify(retrievedTrails));
					}
				}
				$(document).on('click', '#myFavourite', function(){
					if(retrievedFavouriteList != null){
						favouritesList.push(retrievedTrails);
						localStorage.setItem('userFavouriteList', JSON.stringify(favouritesList));
						// alert(favouritesList[0].name);
					}
					else {
						if( (jQuery.inArray(retrievedTrails.name, retrievedFavouriteList)) != -1 ){
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
				var retrievedHazardList = (JSON.parse(localStorage.getItem('userHazardList')));
				var tempX = "";
				var tempY = "";

				if(localStorage.getItem('userHazardList') != null )
				{
					$.each( retrievedHazardList, function( index, value)
					{
						if(retrievedHazardList[index].mapName == $(".trailMapTitle").text() )
						{
							var posX = retrievedHazardList[index].xCoord;
							var posY = retrievedHazardList[index].yCoord;
							var tempHazName = retrievedHazardList[index].hazardName;
							var tempHazDet = retrievedHazardList[index].hazardDetails;
							var tempID = tempHazName+"Overlay";
							var tempHTML = '<div id="'+tempID+'" class="hazardOverlay" style="position: absolute; top:'+posY+'px; left:'+posX+'px"><img src="./img/mapOverlayElement.png"/></div>';
							$( ".tempOverlay" ).before($(tempHTML));
							$( "#"+tempID ).css({'position': 'absolute', 'top':posY, 'left':posX});
						}
						else
						{
							$(".hazardOverlay").remove();
						}

					});

				}

				$(document).on('click', '#trailHazardMap', function(e)
				{
					var offset = $(this).offset();
					var posX = e.pageX;
					var posY = e.pageY;
					tempX = posX;
					tempY = posY;
					$( "#popupAddHazard" ).popup( "open", {x: posX, y: posY} );
					e.preventDefault();
				});

				$(document).on('click', '#addTrailHazard', function(evt)
				{
					retrievedHazardList = (JSON.parse(localStorage.getItem('userHazardList')));
					var tempHazName = $('#hn').val();
					var tempHazDet = $('#hd').val();
					storedHazardList.push({
						"mapName": $(".trailMapTitle").text(),
						"xCoord": tempX,
						"yCoord": tempY,
						"hazardName": tempHazName,
						"hazardDetails": tempHazDet
					});

					localStorage.setItem('userHazardList', JSON.stringify(storedHazardList));
					var tempHTML= '<div id="'+tempHazName+'Overlay" class="hazardOverlay" style="position: absolute; top:'+tempY+'px; left:'+tempX+'px"><img src="./img/mapOverlayElement.png"/></div>';
					$( ".tempOverlay" ).before($(tempHTML));
					// alert('LS==null'+tempHazName+ ' , ' + tempHazDet);
					// alert(tempX+ ' , ' + tempY);
				});

				$(document).on('click', '.hazardOverlay', function(evt)
				{
					var posX = evt.pageX;
					var posY = evt.pageY;
					var retrievedHazardList = (JSON.parse(localStorage.getItem('userHazardList')));
					$( "#popupShowHazard" ).popup( "open", {x: posX, y: posY} );
					evt.preventDefault();

					var tempHazName = ( $(this).attr('id') ).substr( 0, $(this).attr('id').length-7 );
					var tempHazDet = "";
					$('#selectedHazardName').html(tempHazName);
					$.each(retrievedHazardList, function(index)
					{
						tempHazDet = retrievedHazardList[index].hazardDetails;
						$.each( this, function( name, value)
						{
								if(tempHazDet == value)
								{
									if(retrievedHazardList[index].hazardName == tempHazName)
									{
										$('#selectedHazardDetails').html(tempHazDet);
										return (0 > 1);
									}
								}
						});
					});
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

} )();
