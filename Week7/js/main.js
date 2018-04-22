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
					// Output trail information as HTML and append to index.html
					var tempHTML = '<a href="#trailInfo" data-transition="slide" data-role="button" class="test" id="Trail ' + trailId + '"><li><img src="' + imageURL + '"/><h3>' + trailName + '</h3><p>' + trailDescription + '</p></li></a>';
					$(".trailData" ).append($(tempHTML));
				});
			}
		});
		
		// Check to see if localStorage is supported by the user's browser
		if (Modernizr.localstorage) {
			console.log("Local storage is supported by this browser");
			
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
				
			
			/* var storedTrailImgs = {};
				storedTrailImgs.trail1Img = "";
				storedTrailImgs.trail2Img = "";
				storedTrailImgs.trail3Img = "";
				storedTrailImgs.trail4Img = "";
				storedTrailImgs.trail5Img = "";
				storedTrailImgs.trail6Img = "";				
			
			var storedTrailInfo = {};
				storedTrailInfo.trail1Info="";
				storedTrailInfo.trail2Info="";
				storedTrailInfo.trail3Info="";
				storedTrailInfo.trail4Info="";
				storedTrailInfo.trail5Info="";
				storedTrailInfo.trail6Info="";
				
			var storedTrailNotes = {};
				storedTrailNotes.trail1Notes="";
				storedTrailNotes.trail2Notes="";
				storedTrailNotes.trail3Notes="";
				storedTrailNotes.trail4Notes="";
				storedTrailNotes.trail5Notes="";
				storedTrailNotes.trail6Notes="";
				
			var storedHikeHistory = {};
				storedHikeHistory.myHikeHistory = [];*/
				
			var favouritesList = [];
	
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
					// selectedTrail.notes = "";
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
				
					//var tempHTML = '<a href="#trailInfo" data-transition="slide" data-role="button" class="test" id="Trail ' + trailId + '"><li><img src="' + imageURL + '"/><h3>' + trailName + '</h3><p>' + trailDescription + '</p></li></a>';
					var tempHTML2 = '<li><a href="#trailInfo" data-transition="slide" data-role="button" id="historic' + retrievedTrails.name + '"><img src="' + retrievedTrails.image + '"/><h3>' + retrievedTrails.name + '</h3><p>' + retrievedTrails.description + '</p></a></li>';
					$(".historicTrailData" ).append($(tempHTML2));
				
			});

			$(document).on('pagebeforeshow', '#favourites', function(){
				var retrievedFavouriteList = (JSON.parse(localStorage.getItem('userFavouriteList')));
				var retrievedTrails = (JSON.parse(localStorage.getItem('yourTrails')));
				var tempHTML = '<a href="#trailInfo" data-transition="slide" data-role="button" class="test" id="favourite' + retrievedTrails.name + '"><li><img src="' + retrievedTrails.image + '"/><h3>' + retrievedTrails.name + '</h3><p>' + retrievedTrails.description + '</p></li></a>';
				
				
				$(".myFavouritesList" ).append($(tempHTML));
			});

			$(document).on('pagebeforeshow', '#search', function(){
				
			});
			
			$(document).on('pagebeforeshow', '#trailInfo', function(){
				var retrievedTrails = (JSON.parse(localStorage.getItem('yourTrails')));
				var retrievedFavouriteList = (JSON.parse(localStorage.getItem('userFavouriteList')));
				$(document).on('click', '#myFavourite', function(){
					if(retrievedFavouriteList == null){
						favouritesList.push(retrievedTrails);
						localStorage.setItem('userFavouriteList', JSON.stringify(favouritesList));
					}
					else {
						if( ($.inArray(retrievedTrails.name, retrievedFavouriteList)) !== -1 ){
							$('.myFavourite').hide();
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
		else
		{
			$('.message').text("Unfortunately your browser doesn't support local storage");
			$('.message').show();
		}
		
	});
	
})();