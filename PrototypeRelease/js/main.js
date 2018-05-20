/**
* Scripts for Trail Magic (xxxxx)
*
* authors: Jack Bosanquet, Joshua Bauer
* website: NA
*/

( function()
{
	$( document ).ready( function()
	{
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
					var trailName = $trail.find( 'Name' ).text();
					var trailLocation = $trail.find( 'location' ).text();
					var trailDescription = $trail.find( 'Description' ).text();
					var trailNotes = $trail.find( 'Notes' ).text();
					var trailHazards = $trail.find( 'Hazards' ).text();
					var imageURL = $trail.find( 'Image' ).text();
					var trailMap = $trail.find( 'Map' ).text();
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
					var tempHTML = '<a href="#trailInfo" data-transition="slide" data-role="button" class="test" id="Trail ' + trailId + '"><li><img src="' + imageURL + '" class="trailImageThumbnail"/><h3>' + trailName + '</h3><p class="descriptionFinder">' + trailDescription + '</p><p id="trailNotes' + trailId + '" class="hideMe trailInfoNotes">'+ trailNotes +'</p><p class="hideMe trailInfoHazards">'+ trailHazards +'</p><p class="hideMe trailInfoMapURL">'+ trailMap +'</p><p class="hideMe trailInfoLength">'+ trailLength +'</p><p class="hideMe trailInfoSurface">'+ trailSurface +'</p><p class="hideMe trailInfoContact">'+ trailContact +'</p><p class="hideMe trailInfoBPAllowed">'+ trailBackpackingAllowed +'</p><p class="hideMe trailInfoBicyclesAllowed">'+ trailBicyclesAllowed +'</p><p class="hideMe trailInfoFitTrail">'+ trailFitnessTrail +'</p><p class="hideMe trailInfoWaterTrail">'+ trailWaterTrail +'</p><p class="hideMe trailInfoStatus">'+ trailTrailStatus +'</p><p class="hideMe trailInfoAltName">'+ trailAlternativeName +'</p></li></a>';
					$( ".trailData" ).append( $( tempHTML ) );
				});
			}
		});

		// Check to see if localStorage is supported by the browser
		if ( Modernizr.localstorage )
		{
			console.log( "Local storage is supported by this browser" );
			
			//This function sets the variable onboardComplete in localStorage to 1 once user has completed the onboarding steps, will then skip it each time a user runs the app
			//delete localStorage.onboardComplete ; //This is for testing to see first page again
			//console.log(localStorage.onboardComplete);
			var onboard = localStorage.onboardComplete !== undefined;
			var userName = localStorage.userName !== undefined;
			if (onboard) $.mobile.navigate("#home");
			$("#registrationSubmit").click( function()
				{
					localStorage.setItem('onboardComplete', 1);
					if( $('#fullname').val() == "" || $('#fullname').val() == null)
					{
						localStorage.setItem('userName', "Guest" );
					}
					else
					{
						localStorage.setItem('userName', $('#fullname').val() );
					}
					$.mobile.navigate("#home", {transition:"slide"});
				});

			$("#onboard1").swipeleft(function() 
			{
				$.mobile.changePage("#onboard2", {transition:"slide"});
			});
			
			$("#onboard2").swiperight(function() 
			{
				$.mobile.changePage("#onboard1", {transition:"slide", reverse:"true"});
			});
			
			$("#onboard2").swipeleft(function() 
			{
				$.mobile.changePage("#onboard3", {transition:"slide"});
			});
			
			$("#onboard3").swiperight(function() 
			{
				$.mobile.changePage("#onboard2", {transition:"slide", reverse:"true"});
			});
			
			$("#onboard3").swipeleft(function() 
			{
				$.mobile.changePage("#onboard4", {transition:"slide"});
			});
			
			$("#onboard4").swiperight(function() 
			{
				$.mobile.changePage("#onboard3", {transition:"slide", reverse:"true"});
			});

			$(document).on('pagebeforeshow', '#onboard5', function()
			{
				$('#fullname').css({"color":"black"});
				$('#email').css({"color":"black"});
				$('#password').css({"color":"black"});
				$('#confirmpassword').css({"color":"black"});
			});
			
			// Variable for temporarily storing the user's currently selected trail
			var selectedTrail = {};
				selectedTrail.name = "";
				selectedTrail.image = "";
				selectedTrail.map = "";
				selectedTrail.description = "";
				selectedTrail.notes = "";
				selectedTrail.hazards = "";
				selectedTrail.trailLength = "";
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

			// Retrieve userFavouriteList from localStorage
			var retrievedFavouriteList = ( JSON.parse( localStorage.getItem( 'userFavouriteList' ) ) );

			// Check to see if the user has added any trails to their favourites list. If userFavouriteList is 
			// null, hide the favouritesButton.
			if (localStorage.getItem('userFavouriteList') === null)
			{
				$( '#favouritesButton' ).hide();
			}
			// If userFavouriteList is not null, show the favouritesButton
			else
			{
				$( '#favouritesButton' ).show();
			}

			// Check to see if the user has any trails in their hike history. If yourHikeHistory is null, 
			// hide the hikeHistoryButton
			if (localStorage.getItem('yourHikeHistory') === null)
			{
				$( '#hikeHistoryButton' ).hide();
			}
			// If yourHikeHistory is not null, show the hikeHistoryButton
			else
			{
				$( '#hikeHistoryButton' ).show();
			}

			$( document ).on( 'pagebeforeshow', '#home', function()
			{
				// Check to see if the user has added any trails to their favourites list. If userFavouriteList is 
				// null, hide the favouritesButton.
				if (localStorage.getItem('userFavouriteList') === null)
				{
					$( '#favouritesButton' ).hide();
				}
				// If userFavouriteList is not null, show the favouritesButton
				else
				{
					$( '#favouritesButton' ).show();
				}

				// Check to see if the user has any trails in their hike history. If yourHikeHistory is null, 
				// hide the hikeHistoryButton
				if (localStorage.getItem('yourHikeHistory') === null)
				{
					$( '#hikeHistoryButton' ).hide();
				}
				// If yourHikeHistory is not null, show the hikeHistoryButton
				else
				{
					$( '#hikeHistoryButton' ).show();
				}

			});

			$(document).on('pagebeforeshow', '#hikeSelection', function()
			{
				// OnClick function that retrieves trail details from html when a button with the class test
				// is clicked.
				$(document).on('click', '.test', function()
				{
					// Retrieve all trail details stored in the button that was clicked
					var tempTrailName = $(this).find('h3').text();
					var tempImageURL = $(this).find('img').attr("src");
					var tempMapURL = $(this).find('.trailInfoMapURL').text();
					var tempTrailDescription = $(this).find('.descriptionFinder').text();
					var tempTrailNotes =$(this).find('.trailInfoNotes').text();
					var tempTrailHazards = $(this).find('.trailInfoHazards').text();
					var tempTrailLength = $(this).find('.trailInfoLength').text();
					var tempTrailSurface = $(this).find('.trailInfoSurface').text();
					var tempTrailContact = $(this).find('.trailInfoContact').text();
					var tempTrailBPAllowed = $(this).find('.trailInfoBPAllowed').text();
					var tempTrailBicyclesAllowed = $(this).find('.trailInfoBicyclesAllowed').text();
					var tempFitnessTrail = $(this).find('.trailInfoFitTrail').text();
					var tempWaterTrail = $(this).find('.trailInfoWaterTrail').text();
					var tempTrailStatus = $(this).find('.trailInfoStatus').text();
					var tempAlternativeName = $(this).find('.trailInfoAltName').text();
					// Update the content of the application to reflect the currently selected button
					$('.trailInfoTitle' ).html(tempTrailName + " Information");
					$('.trailInfoFavourite').html(tempTrailName+" added to Favourites");
					$('.trailMapTitle').html(tempTrailName + " Map");
					$('#trailInfoNotes').html(tempTrailNotes);
					$('.trailImageFull').attr("src",tempImageURL);
					$('.trailMapFull').attr("src",tempMapURL);
					$('#trailInfoHazards').html(tempTrailHazards);
					$('#trailInfoLength').html(tempTrailLength);
					$('#trailInfoSurface').html(tempTrailSurface);
					$('#trailInfoContact').html(tempTrailContact);
					$('#trailInfoBPAllowed').html(tempTrailBPAllowed);
					$('#trailInfoBicyclesAllowed').html(tempTrailBicyclesAllowed);
					$('#trailInfoFitTrail').html(tempFitnessTrail);
					$('#trailInfoWaterTrail').html(tempWaterTrail);
					$('#trailInfoStatus').html(tempTrailStatus);
					$('#trailInfoAltName').html(tempAlternativeName);
					// Store the trail details from the selected button in selectedTrail
					selectedTrail.name = tempTrailName;
					selectedTrail.image = tempImageURL;
					selectedTrail.map = tempMapURL;
					selectedTrail.description = tempTrailDescription;
					selectedTrail.notes = tempTrailNotes;
					selectedTrail.hazards = tempTrailHazards;
					selectedTrail.trailLength = tempTrailLength;
					selectedTrail.surface = tempTrailSurface;
					selectedTrail.contact = tempTrailContact;
					selectedTrail.backpackingAllowed = tempTrailBPAllowed;
					selectedTrail.bicyclesAllowed = tempTrailBicyclesAllowed;
					selectedTrail.fitnessTrail = tempFitnessTrail;
					selectedTrail.waterTrail = tempWaterTrail;
					selectedTrail.trailStatus = tempTrailStatus;
					selectedTrail.alternativeName = tempAlternativeName;
					// Set 'yourTrail' and 'yourHikeHistory' items in localStorage to the contents of selectedTrail
					localStorage.setItem('yourTrails', JSON.stringify(selectedTrail));
					localStorage.setItem('yourHikeHistory', JSON.stringify(selectedTrail));
				});

			});

			$(document).on('pagebeforeshow', '#news', function()
			{
				var retrievedUserName = localStorage.getItem('userName');
				$('#shareText').css({"color":"black"});
				// OnClick function that submits the content of the input text field shareText to the news
				// social feed when the newssubmit button is clicked.
				$(document).on('click', '#newssubmit', function()
				{
					var newstext = $('#shareText').val();
					$('#newslist li:eq(0)').before('<li><h4>'+retrievedUserName+' says:</h4><p>' + newstext + '</p></li>');
					$('input[id=shareText').val('');
					$( "#newslist" ).listview( "refresh" );
				});
			});

			$(document).on('pagebeforeshow', '#photos', function()
			{
				$(document).on('click', '.userImg', function()
				{
					// Get the image and insert it inside the modal - use its "alt" text as a caption
					var modalImg = $(this).attr("src");
					var captionText = $(this).attr("alt");
					$('#myModal').css({"display":"block"});
					$('#modalUserImg').attr("src",modalImg);
					$('#caption').html(captionText);
				});

				// When the user clicks on <span> (x), close the modal
				$(document).on('click', '.close', function()
				{
					$('#myModal').css({"display":"none"});
				});
				
			});

			$(document).on('pagebeforeshow', '#hikeHistory', function()
			{
				var retrievedTrails = (JSON.parse(localStorage.getItem('yourTrails')));
				var retrievedHikeHistory = (JSON.parse(localStorage.getItem('yourHikeHistory')));
				$(".historicTrailData" ).html("");
				// Check to make sure there are no duplicate entries in historicTrailData
				if((retrievedHikeHistory != null) && (localStorage.getItem('yourHikeHistory') !== null) ){
					$.each( retrievedHikeHistory, function( index, value)
					{
						if( typeof retrievedHikeHistory[index].name != 'undefined' )
						{
							var tempHTML2 = '<li><a href="#trailInfo" data-transition="slide" data-role="button" id="historic' + retrievedHikeHistory[index].name + '" class="ui-btn ui-corner-all ui-mini test"><img class="trailImageThumbnail" src="' + retrievedHikeHistory[index].image + '"/><h3>' + retrievedHikeHistory[index].name + '</h3><p class="descriptionFinder">' + retrievedHikeHistory[index].description + '</p></p><p class="hideMe trailInfoNotes">'+ retrievedHikeHistory[index].notes +'</p><p class="hideMe trailInfoHazards">'+ retrievedHikeHistory[index].hazards +'</p><p class="hideMe trailInfoMapURL">'+ retrievedHikeHistory[index].map +'</p><p class="hideMe trailInfoLength">'+ retrievedHikeHistory[index].trailLength +'</p><p class="hideMe trailInfoSurface">'+ retrievedHikeHistory[index].surface +'</p><p class="hideMe trailInfoContact">'+ retrievedHikeHistory[index].contact +'</p><p class="hideMe trailInfoBPAllowed">'+ retrievedHikeHistory[index].backpackingAllowed +'</p><p class="hideMe trailInfoBicyclesAllowed">'+ retrievedHikeHistory[index].bicyclesAllowed +'</p><p class="hideMe trailInfoFitTrail">'+ retrievedHikeHistory[index].fitnessTrail +'</p><p class="hideMe trailInfoWaterTrail">'+ retrievedHikeHistory[index].waterTrail +'</p><p class="hideMe trailInfoStatus">'+ retrievedHikeHistory[index].trailStatus +'</p><p class="hideMe trailInfoAltName">'+ retrievedHikeHistory[index].alternativeName +'</p></a></li>';
							$(".historicTrailData" ).append($(tempHTML2));
						}
						else
						{
							var tempHTML2 = '';
							$(".historicTrailData" ).append($(tempHTML2));
						}
					});
				}
				
				$('#hikeHistory').on('click', '#clearHikeHistory', function()
				{
						localStorage.removeItem('yourHikeHistory');
						console.log( "yourHikeHistory removed from Local storage" );
				});
				
				$('#hikeHistory').on('click', '.test', function()
				{
					// Retrieve all trail details stored in the button that was clicked
					var tempTrailName = $(this).attr("id");
					tempTrailName = tempTrailName.substring(8);
					var tempImageURL = $(this).find('img').attr("src");
					var tempTrailDescription = $(this).find('.descriptionFinder').text();
					var tempTrailNotes =$(this).find('.trailInfoNotes').text();
					var tempMapURL = $(this).find('.trailInfoMapURL').text();
					var tempTrailHazards = $(this).find('.trailInfoHazards').text();
					var tempTrailLength = $(this).find('.trailInfoLength').text();
					var tempTrailSurface = $(this).find('.trailInfoSurface').text();
					var tempTrailContact = $(this).find('.trailInfoContact').text();
					var tempTrailBPAllowed = $(this).find('.trailInfoBPAllowed').text();
					var tempTrailBicyclesAllowed = $(this).find('.trailInfoBicyclesAllowed').text();
					var tempFitnessTrail = $(this).find('.trailInfoFitTrail').text();
					var tempWaterTrail = $(this).find('.trailInfoWaterTrail').text();
					var tempTrailStatus = $(this).find('.trailInfoStatus').text();
					var tempAlternativeName = $(this).find('.trailInfoAltName').text();
					// Update the content of the application to reflect the currently selected button
					$('.trailInfoTitle' ).html(tempTrailName + " Information");
					$('.trailInfoFavourite').html(tempTrailName+" added to Favourites");
					$('.trailMapTitle').html(tempTrailName + " Map");
					$('#trailInfoNotes').html(tempTrailNotes);
					$('.trailImageFull').attr("src",tempImageURL);
					$('.trailMapFull').attr("src",tempMapURL);
					$('#trailInfoHazards').html(tempTrailHazards);
					$('#trailInfoLength').html(tempTrailLength);
					$('#trailInfoSurface').html(tempTrailSurface);
					$('#trailInfoContact').html(tempTrailContact);
					$('#trailInfoBPAllowed').html(tempTrailBPAllowed);
					$('#trailInfoBicyclesAllowed').html(tempTrailBicyclesAllowed);
					$('#trailInfoFitTrail').html(tempFitnessTrail);
					$('#trailInfoWaterTrail').html(tempWaterTrail);
					$('#trailInfoStatus').html(tempTrailStatus);
					$('#trailInfoAltName').html(tempAlternativeName);
					// Store the trail details from the selected button in testObject
					var testObject = {};
					testObject.name = tempTrailName;
					testObject.image = tempImageURL;
					testObject.map = tempMapURL;
					testObject.description = tempTrailDescription;
					testObject.notes = tempTrailNotes;
					testObject.hazards = tempTrailHazards;
					testObject.trailLength = tempTrailLength;
					testObject.surface = tempTrailSurface;
					testObject.contact = tempTrailContact;
					testObject.backpackingAllowed = tempTrailBPAllowed;
					testObject.bicyclesAllowed = tempTrailBicyclesAllowed;
					testObject.fitnessTrail = tempFitnessTrail;
					testObject.waterTrail = tempWaterTrail;
					testObject.trailStatus = tempTrailStatus;
					testObject.alternativeName = tempAlternativeName;
					// Set 'yourHikeHistory' items in localStorage to the contents of testObject
					localStorage.setItem('yourHikeHistory', JSON.stringify(testObject));
				});
			});

			$(document).on('pagebeforeshow', '#favourites', function()
			{
				var retrievedFavouriteList = (JSON.parse(localStorage.getItem('userFavouriteList')));
				var retrievedTrails = (JSON.parse(localStorage.getItem('yourTrails')));
			});

			$(document).on('pageshow','#favourites',function()
			{
				var retrievedFavouriteList = (JSON.parse(localStorage.getItem('userFavouriteList')));
				var retrievedTrails = (JSON.parse(localStorage.getItem('yourTrails')));
				if(retrievedFavouriteList.length == undefined){
					$.each(retrievedFavouriteList, function( k, v ) {
						if(k=="name"){
							var tempHTML = '<a href="#trailInfo" data-transition="slide" data-role="button" class="ui-btn ui-corner-all ui-mini test" id="favourite' + retrievedFavouriteList.name + '"><li><img class="trailImageThumbnail" src="' + retrievedFavouriteList.image + '"/><h3>' + retrievedFavouriteList.name + '</h3><p class="descriptionFinder">' + retrievedFavouriteList.description + '</p></p><p class="hideMe trailInfoNotes">'+ retrievedFavouriteList.notes +'</p><p class="hideMe trailInfoHazards">'+ retrievedFavouriteList.hazards +'</p><p class="hideMe trailInfoMapURL">'+ retrievedFavouriteList.map +'</p><p class="hideMe trailInfoLength">'+ retrievedFavouriteList.trailLength +'</p><p class="hideMe trailInfoSurface">'+ retrievedFavouriteList.surface +'</p><p class="hideMe trailInfoContact">'+ retrievedFavouriteList.contact +'</p><p class="hideMe trailInfoBPAllowed">'+ retrievedFavouriteList.backpackingAllowed +'</p><p class="hideMe trailInfoBicyclesAllowed">'+ retrievedFavouriteList.bicyclesAllowed +'</p><p class="hideMe trailInfoFitTrail">'+ retrievedFavouriteList.fitnessTrail +'</p><p class="hideMe trailInfoWaterTrail">'+ retrievedFavouriteList.waterTrail +'</p><p class="hideMe trailInfoStatus">'+ retrievedFavouriteList.trailStatus +'</p><p class="hideMe trailInfoAltName">'+ retrievedFavouriteList.alternativeName +'</p></li></a>';
							$( ".myFavouritesList" ).append($(tempHTML));
							return false;
						}
					  
					});
				}
				else
				{
					$.each(retrievedFavouriteList, function( index, value ) {
					  var favouritesCheck = $('.myFavouritesList').text().indexOf(retrievedFavouriteList[index].name) > -1;
					  if(favouritesCheck == false)
					  {
						var tempHTML = '<a href="#trailInfo" data-transition="slide" data-role="button" class="ui-btn ui-corner-all ui-mini test" id="favourite' + retrievedFavouriteList[index].name + '"><li><img class="trailImageThumbnail" src="' + retrievedFavouriteList[index].image + '"/><h3>' + retrievedFavouriteList[index].name + '</h3><p class="descriptionFinder">' + retrievedFavouriteList[index].description + '</p></p><p class="hideMe trailInfoNotes">'+ retrievedFavouriteList[index].notes +'</p><p class="hideMe trailInfoHazards">'+ retrievedFavouriteList[index].hazards +'</p><p class="hideMe trailInfoMapURL">'+ retrievedFavouriteList[index].map +'</p><p class="hideMe trailInfoLength">'+ retrievedFavouriteList[index].trailLength +'</p><p class="hideMe trailInfoSurface">'+ retrievedFavouriteList[index].surface +'</p><p class="hideMe trailInfoContact">'+ retrievedFavouriteList[index].contact +'</p><p class="hideMe trailInfoBPAllowed">'+ retrievedFavouriteList[index].backpackingAllowed +'</p><p class="hideMe trailInfoBicyclesAllowed">'+ retrievedFavouriteList[index].bicyclesAllowed +'</p><p class="hideMe trailInfoFitTrail">'+ retrievedFavouriteList[index].fitnessTrail +'</p><p class="hideMe trailInfoWaterTrail">'+ retrievedFavouriteList[index].waterTrail +'</p><p class="hideMe trailInfoStatus">'+ retrievedFavouriteList[index].trailStatus +'</p><p class="hideMe trailInfoAltName">'+ retrievedFavouriteList[index].alternativeName +'</p></li></a>';
						$( ".myFavouritesList" ).append($(tempHTML));
					  }
					});
				}
				
				$('#favourites').on('click', '.test', function()
				{
					// Retrieve all trail details stored in the button that was clicked
					var tempTrailName = $(this).attr("id");
					tempTrailName = tempTrailName.substring(9);
					var tempImageURL = $(this).find('img').attr("src");
					var tempTrailDescription = $(this).find('.descriptionFinder').text();
					var tempTrailNotes =$(this).find('.trailInfoNotes').text();
					var tempMapURL = $(this).find('.trailInfoMapURL').text();
					var tempTrailHazards = $(this).find('.trailInfoHazards').text();
					var tempTrailLength = $(this).find('.trailInfoLength').text();
					var tempTrailSurface = $(this).find('.trailInfoSurface').text();
					var tempTrailContact = $(this).find('.trailInfoContact').text();
					var tempTrailBPAllowed = $(this).find('.trailInfoBPAllowed').text();
					var tempTrailBicyclesAllowed = $(this).find('.trailInfoBicyclesAllowed').text();
					var tempFitnessTrail = $(this).find('.trailInfoFitTrail').text();
					var tempWaterTrail = $(this).find('.trailInfoWaterTrail').text();
					var tempTrailStatus = $(this).find('.trailInfoStatus').text();
					var tempAlternativeName = $(this).find('.trailInfoAltName').text();
					// Update the content of the application to reflect the currently selected button
					$('.trailInfoTitle' ).html(tempTrailName + " Information");
					$('.trailInfoFavourite').html(tempTrailName+" added to Favourites");
					$('.trailMapTitle').html(tempTrailName + " Map");
					$('#trailInfoNotes').html(tempTrailNotes);
					$('.trailImageFull').attr("src",tempImageURL);
					$('.trailMapFull').attr("src",tempMapURL);
					$('#trailInfoHazards').html(tempTrailHazards);
					$('#trailInfoLength').html(tempTrailLength);
					$('#trailInfoSurface').html(tempTrailSurface);
					$('#trailInfoContact').html(tempTrailContact);
					$('#trailInfoBPAllowed').html(tempTrailBPAllowed);
					$('#trailInfoBicyclesAllowed').html(tempTrailBicyclesAllowed);
					$('#trailInfoFitTrail').html(tempFitnessTrail);
					$('#trailInfoWaterTrail').html(tempWaterTrail);
					$('#trailInfoStatus').html(tempTrailStatus);
					$('#trailInfoAltName').html(tempAlternativeName);
					// Store the trail details from the selected button in testObject
					var testObject = {};
					testObject.name = tempTrailName;
					testObject.image = tempImageURL;
					testObject.map = tempMapURL;
					testObject.description = tempTrailDescription;
					testObject.notes = tempTrailNotes;
					testObject.hazards = tempTrailHazards;
					testObject.trailLength = tempTrailLength;
					testObject.surface = tempTrailSurface;
					testObject.contact = tempTrailContact;
					testObject.backpackingAllowed = tempTrailBPAllowed;
					testObject.bicyclesAllowed = tempTrailBicyclesAllowed;
					testObject.fitnessTrail = tempFitnessTrail;
					testObject.waterTrail = tempWaterTrail;
					testObject.trailStatus = tempTrailStatus;
					testObject.alternativeName = tempAlternativeName;
					// Set 'yourHikeHistory' items in localStorage to the contents of testObject
					localStorage.setItem('yourHikeHistory', JSON.stringify(testObject));
				});
				
			});
			
			$(document).on('pagebeforeshow', '#trailInfo', function()
			{
				var retrievedTrails = (JSON.parse(localStorage.getItem('yourTrails')));
				var retrievedFavouriteList = (JSON.parse(localStorage.getItem('userFavouriteList')));
				var retrievedHikeHistory = (JSON.parse(localStorage.getItem('yourHikeHistory')));
				if((storedHikeHistory != null) || (typeof retrievedHikeHistory == undefined) )
				{
					// $('.trailInfoTitle' ).html(retrievedHikeHistory.name + " Information");
					storedHikeHistory.push(retrievedHikeHistory);
					// var tempStoredHikeHistory = storedHikeHistory.concat(retrievedHikeHistory);
					localStorage.setItem('yourHikeHistory', JSON.stringify(storedHikeHistory));
					// localStorage.setItem('yourHikeHistory', JSON.stringify(tempStoredHikeHistory));
					// alert(retrievedHikeHistory.name);
					// alert(retrievedHikeHistory.length);
				}
				else
				{
					if( (jQuery.inArray(retrievedTrails.name, retrievedHikeHistory)) != -1 ){
						$('#myFavourite').hide();
						// alert("gotcha!");
						$('.trailInfoFavourite').html("");
					}
					else {
						localStorage.setItem('yourHikeHistory', JSON.stringify(retrievedTrails));
						// alert("gotcha!");
					}
				}
				
				$(document).on('click', '#myFavourite', function(){
					if(retrievedFavouriteList != null){
						$.each( retrievedFavouriteList, function( index, value)
						{
							if( retrievedFavouriteList[index].name !=  null ){
								// alert("name:"+retrievedFavouriteList[index].name)
							}
						});
						
						favouritesList.push(retrievedTrails);
						favouritesList = $.grep(favouritesList, function(v, k){
							return $.inArray(v ,favouritesList) === k;
						});
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

			$(document).on('pagebeforeshow', '#trailMap', function()
			{
				var retrievedHazardList = (JSON.parse(localStorage.getItem('userHazardList')));
				if (navigator.onLine)
				{
					$( "#mapid" ).html("");
					// Draw Map Function
					// Select the mapid div in the page, clear it and change its id to 'mymap' to avoid 'map container is already initialized' error
					// Code adapted from StackOverflow (https://stackoverflow.com/questions/19186428/refresh-leaflet-map-map-container-is-already-initialized) Artem_Kovalyov's answer
					$('#mapid').html("<div role='main' class='ui-content' id='mymap'></div>");
					// This sets the map and allows acccess using token
					var mymap = L.map('mymap');
					L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
						attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
						maxZoom: 18,
						id: 'mapbox.streets',
						accessToken: 'pk.eyJ1Ijoiam9zaHliZWUiLCJhIjoiY2poNHBvbmI1MTFxNDJ3bzJzamNhYWtrcCJ9.ylGldaVSlDpQrJ_v325E4w'
					}).addTo(mymap);

					// Get the name of the map that we want to display from the heading (trailMapTitle class)
					var tempMapSelector = $('.trailMapTitle').text();
					tempMapSelector = tempMapSelector.slice(0,-4);
					tempMapSelector = tempMapSelector.split(' ').join('_');
					
					// Find the kml file for the map that we want to display, fit the coordinates
					// to the map frame, centre it and display it
					var runLayer = omnivore.kml('./database/'+tempMapSelector+'.xml')
						.on('ready', function() {
							mymap.fitBounds(runLayer.getBounds());
						})
						.addTo(mymap);

					// Click function that gets the latitude and longitude of click location on
					// current map and opens the addHazard popup.
					var popup = L.popup();
					var tempLat = "";
					var tempLng = "";
					function onMapClick(e) {
						tempLat = e.latlng.lat;
						tempLng = e.latlng.lng;
						popup
							.setLatLng(e.latlng)
							.setContent("<form name='addHazard' action=''><div class='popupContent'><h3>Add Hazard</h3><br><label for='hn' class='ui-hidden-accessible'>Hazard Name:</label><input type='text' name='hname' id='hn' value='' placeholder='Hazard Name' data-theme='a'><br><br><label for='hd' class='ui-hidden-accessible'>Hazard Detail:</label><textarea name='hdetail' id='hd' value='' placeholder='Hazard Detail' data-theme='a'></textarea><br><a href='#' data-theme='a' id='addTrailHazard' class='ui-btn ui-btn-inline ui-mini ui-corner-all'>Add</a></div></form>")
							.openOn(mymap);
							
					}
					mymap.on('click', onMapClick);
					
					// Check to see if the user has added any hazards before. If they have, retrieve
					// them from localStorage and display them on the map.
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
								var marker = L.marker([posX, posY]).addTo(mymap);
								marker.bindPopup("<b>Hazard: </b>"+tempHazName+"<br>"+tempHazDet).openPopup();
								
							}
						});

					}
					
					// When the user clicks on the addTrailHazard button in the addHazard popup,
					// store the relevant details in localStorage and place a new hazard marker on
					// the map
					$(document).on('click', '#addTrailHazard', function(evt)
					{
						retrievedHazardList = (JSON.parse(localStorage.getItem('userHazardList')));
						var tempHazName = $('#hn').val();
						var tempHazDet = $('#hd').val();
						
						
						if(navigator.onLine){
							storedHazardList.push({
								"mapName": $(".trailMapTitle").text(),
								"xCoord": tempLat,
								"yCoord": tempLng,
								"hazardName": tempHazName,
								"hazardDetails": tempHazDet
							});
							mymap.closePopup();
							var marker = L.marker([tempLat, tempLng]).addTo(mymap);
							localStorage.setItem('userHazardList', JSON.stringify(storedHazardList));
							marker.bindPopup("<b>Hazard: </b>"+tempHazName+"<br>"+tempHazDet).openPopup();
						}
						else
						{
							// storedHazardList.push({
								// "mapName": $(".trailMapTitle").text(),
								// "xCoord": tempLat,
								// "yCoord": tempLng,
								// "hazardName": tempHazName,
								// "hazardDetails": tempHazDet
							// });
							// localStorage.setItem('userHazardList', JSON.stringify(storedHazardList));
							// var tempHTML= '<div id="'+tempHazName+'Overlay" class="hazardOverlay" style="position: absolute; top:'+tempLng+'px; left:'+tempLat+'px"><img src="./img/mapOverlayElement.png"/></div>';
							// $( ".tempOverlay" ).before($(tempHTML));
						}
						
					});
				}
				else 
				{
					var tempMapName = $(".trailMapTitle").text();
					tempMapName = tempMapName.split(' ').join('_');
					var tempHTML = '<!-- Info will be selected from the XML file(based on what the user selected) so this page is populated with appropriate data --><img class="trailMapFull" src="./img/trailmap/'+tempMapName+'.jpg" usemap="#image-map"/><map name="image-map" id="trailHazardMap"><div class="tempOverlay"></div><area target="" alt="Trail Map" title="Trail Map" href="#popupShowHazard" coords="608,1,2,805" shape="rect" data-rel="popup" data-position-to="window" data-role="button" data-inline="true" role="button" aria-haspopup="true" aria-owns="popupShowHazard" aria-expanded="false"></map>'
					$( "#mapid" ).html(tempHTML);
					//OLD MAP HAZARD PLOTTING
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

					$(document).on('click', '.trailMapFull', function(e)
					{
						var offset = $(this).offset();
						var posX = e.pageX;
						var posY = e.pageY;
						tempX = posX;
						tempY = posY;
						$( "#popupAddHazard" ).popup( "open", {x: posX, y: posY} );
						e.preventDefault();
					});

					// $(document).on('click', '#addTrailHazard', function(evt)
					// {
						// retrievedHazardList = (JSON.parse(localStorage.getItem('userHazardList')));
						// var tempHazName = $('#hn').val();
						// var tempHazDet = $('#hd').val();
						// storedHazardList.push({
							// "mapName": $(".trailMapTitle").text(),
							// "xCoord": tempX,
							// "yCoord": tempY,
							// "hazardName": tempHazName,
							// "hazardDetails": tempHazDet
						// });

						// localStorage.setItem('userHazardList', JSON.stringify(storedHazardList));
						// var tempHTML= '<div id="'+tempHazName+'Overlay" class="hazardOverlay" style="position: absolute; top:'+tempY+'px; left:'+tempX+'px"><img src="./img/mapOverlayElement.png"/></div>';
						// $( ".tempOverlay" ).before($(tempHTML));
						// alert('LS==null'+tempHazName+ ' , ' + tempHazDet);
						// alert(tempX+ ' , ' + tempY);
					// });

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
											return false;
										}
									}
							});
						});
					});
				}
				
				//This is an example hazard point
				// var marker = L.marker([-33.946374, 115.097917]).addTo(mymap);
				// marker.bindPopup("<b>Hazard</b><br>This is example hazard").openPopup();
				
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
