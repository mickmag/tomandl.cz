	// CONSTANTS
	var page = {
		'home':'home.html',		
		'machine_equipment':'machine_equipment.html',
		'products':'products.html',
		'career':'career.html',
		'history':'history.html',
		'contact':'contact.html',
		
		
	};
	
	var lang = {
		'czech' : 'cs',
		'german' : 'de',
		'english' : 'en',
	};
	
	// GLOBAL VARIABLES
	var $_ = jQuery.i18n.prop;
	var page_name;
	var current_language;
	
	// load home on first page and set page_name attribute to links in menu
	$(document).ready( function() {
		current_language = 'cs';
		$("#content").load("html/" + page.home, function() {
			afterLoadingActions();
		});
		$("#home").attr("page_name", page.home);
		$("#machine_equipment").attr("page_name", page.machine_equipment);
		$("#products").attr("page_name", page.products);
		$("#career").attr("page_name", page.career);
		$("#history").attr("page_name", page.history);
		$("#contact").attr("page_name", page.contact);				
	});
	
	
	$(document).ready( function() {
	
		// ---------------------------------------------
		//Click event to scroll to top
		$('#link-top').click(function(){
			$('html, body').animate({scrollTop : 0},800);
			return false;
		});
		
		// ---------------------------------------------
		// resize google map when resizing browser
		// $(window).resize(function()	{
		// 	if (page_name == page.contact) {
		// 			var width = $("#map_canvas").width();
		// 			// to provide square map set height same like width
		// 			$("#map_canvas").css("height", width);
		// 	}
		// });
		
		// ---------------------------------------------
		// loading pages available from menu
		$(".menu li a").on("click", function() {
			page_name = $(this).attr('page_name');
			
			// showLoader
			// $("#loader").show();
			// $("#content").hide();
			showLoader();
			
			// set current page
			$(".menu li").removeClass("current");
		    $(this).parent().addClass("current");		
								

			// load map when contact page
			if (page_name == page.contact) {		
				$("#content").load("html/" + page_name, function () {					
					afterLoadingActions();
					var width = $("#mapa").width();
					// to provide square map set height same like width
					$("#mapa").css("height", width);
					
					// initialize mapy.cz
					var center = SMap.Coords.fromWGS84(12.9922629, 49.4363693);
					var mapa = new SMap(JAK.gel("mapa"), center, 10);
					mapa.addDefaultLayer(SMap.DEF_BASE).enable();
					mapa.addDefaultControls();	      	      

					// add marker
					var layer = new SMap.Layer.Marker();
					var layer = new SMap.Layer.Marker();
					mapa.addLayer(layer);
					layer.enable();

					var card = new SMap.Card();
					card.getHeader().innerHTML = "<strong>Kovo Tomandl CNC s.r.o.</strong>";

					var options = { 
					    title: "Kovo Tomandl CNC"
					};
					var marker = new SMap.Marker(center, "myMarker", options);
					marker.decorate(SMap.Marker.Feature.Card, card);
					layer.addMarker(marker);

					// fix inner map width
					$('#mapa div:first-child').addClass('width100');
				});
			}
			else {
				$("#content").load("html/" + page_name, function() {				
					afterLoadingActions();					
				});				
				
			}
			return false;
		});
		
		// ---------------------------------------------
		// changing language
		$("#language a img").on("click", function() {
			current_language = $(this).attr('alt');			
			// toggleCareer();
			
			if ( $(this).hasClass("current_lang") ) {
				// user chose same language which is already active
				// DO NOTHING	
			}
			else {
				// load home page
				$(".menu li").removeClass("current");
				$("#home").parent().addClass("current");
								
				$("#content").load("html/" + page.home, function() {													
					afterLoadingActions();
				}); 
		
				// switch graphic of flag
				$("#language img").removeClass("current_lang");
				$(this).addClass("current_lang");					
			}
			return false;
		});	
	});

	// FUNCTIONS	
	function showLoader() {
		$("#loader").show();
		$("#content").hide();
	}

	function afterLoadingActions() {		
		$('#loader').hide();
		$("#content").fadeIn();
		init();
		setLanguage(current_language);
	};
	
	function toggleCareer() {
		if (current_language == lang.czech) {
			$( "#career" ).fadeIn();
		}
		else {
			$( "#career" ).hide();			
		}	
	}
	
	function setLanguage(lang) {	
		jQuery.i18n.properties({
			name:'messages', 
			path:'bundles/', 
			mode:'map', //TODO test map
			cache: false,
			language:lang, 
			callback: function() {
				// test if files were loaded well
				if ($_('msg_home') != '[msg_home]') {
					update();
				}
				else {
					//TODO: error message
				}				
			}
		});
	}
	
	function update() {
		updateMenu();
		updateHome();
		updateMachineEquipment();
		updateProducts();
		updateHistory();
		updateContact();
		if (page_name == page.machine_equipment) {
			attachVideoClick();
		}
	}

	function attachVideoClick() {
		$("#nakamura_video").click(function() {
			$.fancybox({
				'padding'		: 0,
				'autoScale'		: false,
				'transitionIn'	: 'none',
				'transitionOut'	: 'none',
				'title'			: this.title,
				'width'			: 889,
				'height'		: 500,
				'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
				'type'			: 'swf',
				'swf'			: {
				   	 'wmode'		: 'transparent',
					'allowfullscreen'	: 'true'
				}
			});
			return false;
		});
	}
	
	function updateMenu() {
		$('#home span').text($_('msg_home'));
		$('#machine_equipment span').text($_('msg_machine_equipment'));
		$('#products span').text($_('msg_products'));
		$('#history span').text($_('msg_history'));
		$('#contact span').text($_('msg_contact'));
	}
	
	function updateHome() {
	    // offer
		$('#home_page h5').first().text($_('msg_we_offer'));		
		setMsg('#offers span', 'msg_offer_');
		
		// advantages
		$('#home_page h5').last().text($_('msg_our_advantages'));
		setMsg('#advantages span', 'msg_advantages_');
		
		// path to certificate
		$('#certificate').attr('href', $_('path_certificate'));	
	}
	
	function updateMachineEquipment() {
		$('#milling_centers_title').html($_('msg_milling_centers_title'));
		$('#axa').html($_('msg_axa'));
		$('#axa_vsc').html($_('msg_axa_vsc'));
		$('#kiwa').html($_('msg_kiwa'));
		
		$('#lathe_centers_title').html($_('msg_lathe_centers_title'));
		$('#nakamura_tome_title').html($_('msg_nakamura_tome_title'));
		$('#nakamura_tome').html($_('msg_nakamura_tome'));
		$('#mazak_hqr').html($_('msg_mazak_hqr'));
		$('#pasova_pila_title').html($_('msg_pasova_pila_title'));
		$('#pasova_pila').html($_('msg_pasova_pila'));		
		$('#miyano1').html($_('msg_miyano1'));
		$('#miyano2').html($_('msg_miyano2'));
		$('#puma').html($_('msg_puma'));
		$('#mazak').html($_('msg_mazak'));	
		$('#haas').html($_('msg_haas'));
		$('#measuring_maschine_title').html($_('msg_measuring_machine_title'));		
		$('#wenzel').html($_('msg_wenzel'));		
	}
	
	function updateProducts() {
		$('#products_title').text($_('msg_products_title'));		
	}
	
	function updateHistory() {
		$('#history_text').html($_('msg_history_text'));
	}
	
	function updateFooter() {
		
	}
	
	function updateContact() {
		$('.director_female').text($_('msg_director_female'));
		$('.director_male').text($_('msg_director_male'));
		$('.production_head_lathe').text($_('msg_production_head_lathe'));
		$('.production_head_milling').text($_('msg_production_head_milling'));
	}
	
	function setText(selector, msg) {
		if ($_(''));
	}
	
	function setMsg(selector, msg_prefix) {
		$(selector).each(function(index, value) {
			var msg = msg_prefix + index;
			$(this).html($_(msg));
		});
	}

