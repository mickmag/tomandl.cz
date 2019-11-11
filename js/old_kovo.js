	var page_name;
	var home = "home.html"
	
	var constants = {
		'constant1': 'value1',
		'constant2': 'value2'
	};
	
	// load home on first page
	$(document).ready( function() {
			$("#content").load("html/home.html");
			$("#home").attr("page_name", home);			
	});
	
	// resize google map when resizing browser
	$(document).ready( function() {
		$(window).resize(function()	{
			if (page_name == "contact.html") {
					var width = $("#map_canvas").width();
					// to provide square map set height same like width
					$("#map_canvas").css("height", width);
			}
		});
	});
	
	$(document).ready( function() {
		$("#language a img").on("click", function() {
			var current_language = $(this).attr('alt');	
			if (current_language == "czech") {
				$( "a[page_name='career.html']" ).fadeIn();
			}
			else {
				$( "a[page_name='career.html']" ).hide();
			}
			
			$("#language a img").removeClass("current_lang");
			$(this).addClass("current_lang");	
			// $('html, body').animate({
				// scrollTop: $("#content").offset().top
				// }, 1000);
		});
	});	
	
	
	// loading pages available from menu
	$(document).ready( function() {
		$(".menu li a").on("click", function() {
			page_name = $(this).attr('page_name');
			$("#content").html("nacitam...");
			$(".menu li").removeClass("current");
		    $(this).parent().addClass("current");		
			// $("#kariera").toggle();
			// $( "a[page_name='career.html']" ).toggle();
			// $("#content").load(page_name);
			
			// show slider only on first page
			if (page_name == "home.html") {
				$(".slider").show();
				slider.reloadSlider();
			}
			else {
				$(".slider").hide();
			}

			// load map when contact page
			if (page_name == "contact.html") {		
				$("#content").load("html/" + page_name, function () {
					// scroll to the content part
					// $('html, body').animate({
						// scrollTop: $("#content").offset().top
					// }, 1);
					var width = $("#map_canvas").width();
					// to provide square map set height same like width
					$("#map_canvas").css("height", width);
					initializeMap();		
				});
			}
			else {
				$("#content").load("html/" + page_name, function() {
					// scroll to the content part
					// $('html, body').animate({
						// scrollTop: $("#content").offset().top
					// }, 1);
				});
				
			}
			// return false;
		});
	});