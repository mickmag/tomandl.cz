	   // Enable the visual refresh	  
	   google.maps.visualRefresh = true;
	   
	  function initializeMap() {
		var zoom = 10;
		var position = new google.maps.LatLng(49.436356, 12.992725);
		var myOptions = {
		  zoom: zoom,
		  center: position,
		  mapTypeId: google.maps.MapTypeId.ROADMAP	  
		};
		var map = new google.maps.Map(
			document.getElementById("map_canvas"),
			myOptions);
	 
		var marker = new google.maps.Marker({
			position: position,
			map: map,
			animation: google.maps.Animation.DROP,
			title:"KOVO TOMANDL CNC s.r.o."
		});  
	 
		
		var contentString = '<b>KOVO TOMANDL CNC s.r.o.</b>'; // <br/><img src="" alt="sample image">
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
	 
		google.maps.event.addListener(marker, 'click', function() {
		  infowindow.open(map, marker);
		});
		
		google.maps.event.addListener(marker, 'dblclick', function() {
		  map.setZoom(++zoom);
		  map.setCenter(marker.getPosition());
		});
		
		/* is this working? */
		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center); 
		});			
	  }