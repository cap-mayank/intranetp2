
jQuery(document).ready(function ($) {
	
	$( ".sixthColumnFooter .menu" ).wrap( "<div class='menu-block-wrapper menu-block-6 menu-name-menu-footer-menu-6 parent-mlid-0 menu-level-1 open'></div>" );
	// Check if mobile is accessing the site and change menu links in footer to accordian for mobile.
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	if( isMobile.any() ) {
		function close_accordion_section() {
			jQuery('.accordion-section-title').removeClass('active');
			jQuery('.accordion .menu-block-wrapper').slideUp(300).removeClass('open');
		}
		jQuery('.accordion-section-title').click(function(e) {
			// Grab current anchor value
			var par = $(event.target).parent();
			var currentAttrValue = jQuery(this).attr('href');
			if(jQuery($(event.target).parent()).is('.active')) {
				close_accordion_section();
			}else {
				close_accordion_section();
				// Add active class to section title
				jQuery(this).addClass('active');
				// Open up the hidden content panel
				jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
			}
			e.preventDefault();
		});
	}
	
	
	$(document).ready(function () {
		
		$(".icon").click(function(){
				$(".sideMenu ul.menu").toggle();
				$("#adminOverlay").toggle();
			});
		
		
		
		
		
		$('.lightbox-processed>img').click(function(){
			
			$('body').css('position', 'fixed');
		})
	
	
		
		$('#bottomNavClose').click(function(){
			
			$('body').css('position', 'static');
			
			
		});
		
    $(".tabsSettings").click(function () {
        //Toggle the child but don't include them in the hide selector using .not()
        $('ul.primary').toggle();

    });
    
     $(".userMenu").mouseover(function () {
        //Toggle the child but don't include them in the hide selector using .not()
        $('.workflowMenu').toggle();

    });
     
    
});
	
	
	$(document).mouseup(function (e)
		{
			var container = $(".sideMenu ul.menu");

			if (!container.is(e.target) // if the target of the click isn't the container...
				&& container.has(e.target).length === 0) // ... nor a descendant of the container
			{
				container.hide();
			}
		});
		
    
    
    	$(document).mouseup(function (e)
		{
			var container = $(".userMenu");

			if (!container.is(e.target) // if the target of the click isn't the container...
				&& container.has(e.target).length === 0) // ... nor a descendant of the container
			{
				$(".workflowMenu").hide();
			}
		});
    
    
		$(document).mouseup(function (e)
		{
			var container = $(".icon");

			if (!container.is(e.target) // if the target of the click isn't the container...
				&& container.has(e.target).length === 0) // ... nor a descendant of the container
			{
				$("#adminOverlay").hide();
			}
		});
	
	$(window).load(function () {
  setTimeout(function(){ Drupal.homebox.equalizeColumnsHeights(); }, 200);	     
  });
$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.toptip').fadeIn();
        } else {
            $('.toptip').fadeOut();
        }
    });

    $('.toptip').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});
	"use strict";

	jQuery.browser={};(function(){jQuery.browser.msie=false;
	jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
	jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
	/*$('body').append('<script type="text/javascript" src="customizer/script.js"></script>');*/

	//add id='js-news'
	$(".js-hidden.js-news").attr('id','js-news');

	// Superfish
	if ($(".sf-menu")[0]) {
		$('.sf-menu').superfish({
			delay: 100,
			autoArrows: true,
			animation: {
				opacity: 'none', height: 'show'
			},
			speed: 300
		});
		$('.sf-menu li li .sf-sub-indicator i').removeClass('fa-chevron-down').addClass('fa-chevron-right');
	}
	// Tabs
	var tabs = jQuery('ul.tabs');
	tabs.each(function (i) {
		// get tabs
		var tab = jQuery(this).find('> li > a');
		tab.click(function (e) {
			// get tab's location
			var contentLocation = jQuery(this).attr('href');
			// Let go if not a hashed one
			if (contentLocation.charAt(0) === "#") {
				e.preventDefault();
				// add class active
				tab.removeClass('active');
				jQuery(this).addClass('active');
				// show tab content & add active class
				jQuery(contentLocation).fadeIn(500).addClass('active').siblings().hide().removeClass('active');
			}
		});
	});
	// Accordion
	jQuery("ul.tt-accordion li").each(function () {
		if (jQuery(this).index() > 0) {
			jQuery(this).children(".accordion-content").css('display', 'none');
		} else {
			if ($(".faq")[0]) {
				jQuery(this).addClass('active').find(".accordion-head-sign").append("<i class='fa-minus'></i>");
				jQuery(this).siblings("li").find(".accordion-head-sign").append("<i class='fa-plus'></i>");
			} else {
				jQuery(this).addClass('active').find(".accordion-head-sign").append("<i class='fa-minus'></i>");
				jQuery(this).siblings("li").find(".accordion-head-sign").append("<i class='fa-plus'></i>");
			}
		}
		jQuery(this).children(".accordion-head").bind("click", function () {
			jQuery(this).parent().addClass(function () {
				if (jQuery(this).hasClass("active")) {
					return;
				} {
					return "active";
				}
			});
			if ($(".faq")[0]) {
				jQuery(this).siblings(".accordion-content").slideDown();
				jQuery(this).parent().find(".accordion-head-sign i").addClass("fa-minus").removeClass("fa-plus");
				jQuery(this).parent().siblings("li").children(".accordion-content").slideUp();
				jQuery(this).parent().siblings("li").removeClass("active");
				jQuery(this).parent().siblings("li").find(".accordion-head-sign i").removeClass("fa-minus").addClass("fa-plus");
			} else {
				jQuery(this).siblings(".accordion-content").slideDown();
				jQuery(this).parent().find(".accordion-head-sign i").addClass("fa-minus").removeClass("fa-plus");
				jQuery(this).parent().siblings("li").children(".accordion-content").slideUp();
				jQuery(this).parent().siblings("li").removeClass("active");
				jQuery(this).parent().siblings("li").find(".accordion-head-sign i").removeClass("fa-minus").addClass("fa-plus");
			}
		});
	});
	// Toggle
	jQuery("ul.tt-toggle li").each(function () {
		jQuery(this).children(".toggle-content").css('display', 'none');
		jQuery(this).find(".toggle-head-sign").html("<i class='fa-plus'></i>");
		jQuery(this).children(".toggle-head").bind("click", function () {
			if (jQuery(this).parent().hasClass("active")) {
				jQuery(this).parent().removeClass("active");
			} else {
				jQuery(this).parent().addClass("active");
			}
			jQuery(this).find(".toggle-head-sign").html(function () {
				if (jQuery(this).parent().parent().hasClass("active")) {
					return "<i class='fa-minus'></i>";
				} else {
					return "<i class='fa-plus'></i>";
				}
			});
			jQuery(this).siblings(".toggle-content").slideToggle();
		});
	});
	jQuery("ul.tt-toggle").find(".toggle-content.active").siblings(".toggle-head").trigger('click');

	// Responsive
	$(".c_head nav").before('<div id="mobilepro"><i class="fa-reorder fa-times"></i></div>');
	$(".second_menu").append('<div id="mobilepro"><i class="fa-reorder fa-times"></i></div>');
	$(".sf-menu a.sf-with-ul").before('<div class="subarrow"><i class="fa-angle-down"></i></div>');
	$('.c_head .subarrow').click(function () {
		$(this).parent().toggleClass("xpopdrop");
	});
	$('.second_menu .subarrow').click(function () {
		$(this).parent().toggleClass("xpopdrop");
	});
	$('.c_head #mobilepro').click(function () {
		$('.c_head .sf-menu').slideToggle('slow', 'easeInOutExpo').toggleClass("xactive");
		$(".c_head #mobilepro i").toggleClass("fa-reorder");
	});
	$('.second_menu #mobilepro').click(function () {
		$('.second_menu .sf-menu').slideToggle('slow', 'easeInOutExpo').toggleClass("xactive");
		$(".second_menu #mobilepro i").toggleClass("fa-reorder");
	});
	$("body").click(function() {
		$('.c_head .xactive').slideUp('slow', 'easeInOutExpo').removeClass("xactive");
		$(".c_head #mobilepro i").addClass("fa-reorder");
	});
	$("body").click(function() {
		$('.second_menu .xactive').slideUp('slow', 'easeInOutExpo').removeClass("xactive");
		$(".second_menu #mobilepro i").addClass("fa-reorder");
	});
	$('.c_head #mobilepro, .c_head .sf-menu').click(function(e) {
		e.stopPropagation();
	});
	$('.second_menu #mobilepro, .second_menu .sf-menu').click(function(e) {
		e.stopPropagation();
	});
	function checkWindowSize() {
		if ($(window).width() >= 959) {
			$('.sf-menu').css('display', 'block').removeClass("xactive");
		} else {
			$('.sf-menu').css('display', 'none');
		}
	}
	$(window).load(checkWindowSize);
	$(window).resize(checkWindowSize);
	// ToTop
	jQuery('#toTop').click(function () {
		jQuery('body,html').animate({
			scrollTop: 0
		}, 1000);
	});

	// News Ticker
	if ($(".js-hidden")[0]) {	
		$('.js-news').ticker({
			speed: 0.10,
			controls: false,
			titleText: 'Latest',
			displayType: 'reveal',
			direction: 'ltr',
			pauseOnItems: 2500
		});
		$('#js-news-rtl').ticker({
			speed: 0.10,
			controls: false,
			titleText: 'Latest',
			displayType: 'reveal',
			direction: 'rtl',
			pauseOnItems: 2500
		});
	}

	// Search
	$(".search_icon").click(function() {
		if ($(this).hasClass('opened')) {
			$(this).removeClass('opened');
			$('.search_icon i').removeClass('activeated_search');
			$('.s_form').fadeOut('slow').removeClass('animated expandOpen').addClass('animated expandOpen');
		} else {
			$(this).addClass('opened');
			$('.search_icon i').addClass('activeated_search');
			$(".s_form").fadeIn('slow').removeClass('animated expandOpen').addClass('animated expandOpen');
			$('.search_icon #inputhead').focus();
		}
	});
	$("body").click(function() {
		$('.search_icon').removeClass('opened');
		$('.search_icon i').removeClass('activeated_search');
		$('.s_form').fadeOut('slow').removeClass('animated expandOpen').addClass('animated expandOpen');
	});
	$('.search').click(function(e) {
		e.stopPropagation();
	});

	// Notification
	$(".notification-close").click(function () {
		$(this).parent().slideUp("slow");
		return false;
	});

	// Sliders
	/*if ($(".intranet_slider")[0]) {
		$("[class^='slider_']").owlCarousel({
			slideSpeed : 500,
			paginationSpeed : 500,
			autoPlay: true,
			autoHeight: true,
			stopOnHover: true,
			addClassActive: true,
			transitionStyle : "goDown",
			singleItem:true,
			lazyLoad : true,

			navigation : false,
			navigationText : ["<i class='fa-chevron-left'></i>","<i class='fa-chevron-right'></i>"],
			rewindNav : true,
			scrollPerPage : false,
			pagination : true,
			paginationNumbers: false
		});
	}*/
	if ($("[class^='small_slider_']")[0]) {
		$("[class^='small_slider_']").owlCarousel({
			slideSpeed : 600,
			paginationSpeed : 600,
			autoPlay: false,
			autoHeight: false,
			addClassActive: true,
			singleItem:true,

			navigation : false,
			rewindNav : true,
			scrollPerPage : false,
			pagination : true,
			paginationNumbers: false
		});
	}
	if ($("[class^='carousel_']")[0]) {
		$("[class^='carousel_']").owlCarousel({
			autoPlay: 4000, //Set AutoPlay to 3 seconds
			items : 3,
			stopOnHover: true,
			addClassActive: true,
			transitionStyle : "goDown",
			itemsDesktop : [1170,3],
			itemsDesktopSmall : [960,3]
		});
	}

	// Ajax Contact
	if ($("#contactForm")[0]) {
		$('#contactForm').submit(function () {
			$('#contactForm .error').remove();
			$('#contactForm .requiredField').removeClass('fielderror');
			$('#contactForm .requiredField').addClass('fieldtrue');
			$('#contactForm span strong').remove();
			var hasError = false;
			$('#contactForm .requiredField').each(function () {
				if (jQuery.trim($(this).val()) === '') {
					var labelText = $(this).prev('label').text();
					$(this).addClass('fielderror');
					$('#contactForm span').html('<strong>*Please fill out all fields.</strong>');
					hasError = true;
				} else if ($(this).hasClass('email')) {
					var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					if (!emailReg.test(jQuery.trim($(this).val()))) {
						var labelText = $(this).prev('label').text();
						$(this).addClass('fielderror');
						$('#contactForm span').html('<strong>Is incorrect your email address</strong>');
						hasError = true;
					}
				}
			});
			if (!hasError) {
				$('#contactForm').slideDown('normal', function () {
					$("#contactForm #sendMessage").addClass('load-color');
					$("#contactForm #sendMessage").attr("disabled", "disabled").addClass("btn-success").val('Sending message. Please wait...');
				});
				var formInput = $(this).serialize();
				$.post($(this).attr('action'), formInput, function (data) {
					$('#contactForm').slideUp("normal", function () {
						$(this).before('<div class="notification-box notification-box-success"><p><i class="fa-check"></i>Thanks!</strong> Your email was successfully sent. We check Our email all the time.</p></div>');
					});
				});
			}
			return false;
		});
	}

	// Tipsy
		$('.toptip').tipsy({fade: true,gravity: 's'});
		$('.bottomtip').tipsy({fade: true,gravity: 'n'});
		$('.righttip').tipsy({fade: true,gravity: 'w'});
		$('.lefttip').tipsy({fade: true,gravity: 'e'});

	// Sticky
	if ($(".sticky_true")[0]){
		$('.sticky_true').before('<div class="Corpse_Sticky"></div>');
		$(window).scroll(function(){
			var wind_scr = $(window).scrollTop();
			var window_width = $(window).width();
			var head_w = $('.sticky_true').height();
			if (window_width >= 960) {
				if(wind_scr < 200){
					if($('.sticky_true').data('sticky') === true){
						$('.sticky_true').data('sticky', false);
						$('.sticky_true').stop(true).animate({opacity : 0}, 300, function(){
							$('.sticky_true').removeClass('sticky');
							$('.sticky_true').stop(true).animate({opacity : 1}, 300);
							$('.Corpse_Sticky').css('padding-top', '');
						});
					}
				} else {
					if($('.sticky_true').data('sticky') === false || typeof $('.sticky_true').data('sticky') === 'undefined'){
						$('.sticky_true').data('sticky', true);
						$('.sticky_true').stop(true).animate({opacity : 0},300,function(){
							$('.sticky_true').addClass('sticky');
							$('.sticky_true.sticky').stop(true).animate({opacity : 1}, 300);
							$('.Corpse_Sticky').css('padding-top', head_w + 'px');
						});
					}
				}
			}
		});
		$(window).resize(function(){
			var window_width = $(window).width();
			if (window_width <= 960) {
				if($('.sticky_true').hasClass('sticky')){
					$('.sticky_true').removeClass('sticky');
					$('.sticky_true').stop(true).animate({opacity : 0}, 300, function(){
						$('.sticky_true').removeClass('sticky');
						$('.sticky_true').stop(true).animate({opacity : 1}, 300);
						$('.Corpse_Sticky').css('padding-top', '');
					});
				}
			}
		});
	}
	
	
});
//function to retrieve date ordinal
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "<span class='dateOrdinal'>th</span>";
}

function date_time(id) {
  date = new Date;
  year = date.getFullYear();
  month = date.getMonth();
  months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  d = date.getDate();
  day = date.getDay();
  days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
   
  /*h = date.getHours();
  if (h < 10) {
    h = "0" + h;
  }
  m = date.getMinutes();
  if (m < 10) {
    m = "0" + m;
  }
  s = date.getSeconds();
  if (s < 10) {
    s = "0" + s;
  }*/
  var current_time = date.toLocaleTimeString().replace(/:\d+ /, ' ');
  current_time= current_time.replace(" ", " <span>")+"</span>";
  result = '<span class="clock">' +current_time + '</span> ' +'<span class="headerdate">' + days[day] + ', ' + months[month] + ' ' + ordinal_suffix_of(d) + ' ' + year + '</span>';
  //result = ''+days[day]+' '+d+' '+months[month]+' '+year;
  document.getElementById(id).innerHTML = result;
  setTimeout('date_time("' + id + '");', '1000');
  return true;
}
date_time('date_time');


// edit node buttons
(function($){
    // wait til everything loads before firing
    $(document).ready(function(){
        //insert edit icon into div.tabs
        jQuery('ul.tabs').prepend(jQuery("<i class=\"icon-edit\"></i>"));  
        //insert div.tabs into page title
        jQuery('h1').prepend(jQuery('ul.tabs'));
    }); 
})(jQuery);