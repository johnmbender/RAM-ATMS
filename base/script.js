/**
 * 
 # @base/script.js
 */

// reposition elements based on window size
reposition();

// set nav as phat by default
var nav = 'phat';

// control the hamburger menu
$('.fa-bars').click(function() {
	$('.fa-bars').prop('aria-expanded', 'true');
	$('#nav-overlay').css('height', '100%');
});
$('#overlay-close-button').click(function() {
	$('.fa-bars').prop('aria-expanded', 'false');
	$('#nav-overlay').css('height', '0%');
});

// hover events on social media icons
$('#social-media img').on('mouseenter', function() {
	var src = $(this).attr('src').replace('.png','-black.png');
	$(this).attr('src',src);
}).on('mouseleave', function() {
	var src = $(this).attr('src').replace('-black.png','.png');
	$(this).attr('src',src);
});

// position elements based on screen resolution or resizing
function reposition() {
	if ($(document).scrollTop() > 0) {
		$(document).trigger('scroll');
	}

	var gutter = $('#RAM-logo').offset().left;
	headerHeight = $('header').height();
	if ($('#hero').length != 0) {
		$('.carousel-caption').css('padding-left', gutter);
		if ($('#up-close-banner').length > 0) {
			$('#up-close-banner img').css('marginLeft', gutter);
		}
	}

	var fontSize = $('#RAM-text').css('font-size').replace('px','');
	var thin_nav_padding = headerHeight - fontSize - 17;
	$('#thin').css('padding-top', thin_nav_padding + 'px');
}

// on device rotation, reload page
$(window).on('orientationchange', function() {
	location.reload();
});

// window resized
$(window).resize(function(e) {
	reposition();
});

// HEADER: shrink/grow
var headerHeight = null;
var header_parallax = 3;

// adjust header to shrink as page is scrolled
$(document).scroll(function(e) {
	var scroll = $(document).scrollTop();
	adjustHeader(scroll);
});

// header adjust on scroll
function adjustHeader(scroll) {
	var top = -scroll / header_parallax;
	var header_top = $('header').height() + top;
	headerHeight = $('header').height();

	if ($(document).width() <= 675)
		return false;

	if (header_top <= 54 && nav == 'phat') {
			nav = 'thin';
			$('header').css('top', 54 - headerHeight);
			$('#phat').hide();
			$('#thin').show();
			return;
	} else if (header_top >= 54) {
		if (nav == 'thin') {
			nav = 'phat';
			$('#thin').hide();
			$('#phat').show();
		}

		// move
		$('header').css('top', top);
	} else
		return;
}

// add bootstrap classes to buttons on ATMS for design
$('input[name="submitButton"]').addClass('btn btn-secondary');