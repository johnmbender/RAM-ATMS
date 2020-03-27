/**
 * 
 # @base/script.js
 */

function retrieveURLparams() {
	var regex = /[?&]([^=#]+)=([^&#]*)/g,
	url = window.location.href,
	params = {},
	match;
	while(match = regex.exec(url)) {
		params[match[1]] = match[2];
	}

	return params;
}

$('.fa-bars').click(function() {
	$('.fa-bars').prop('aria-expanded', 'true');
	$('#nav-overlay').css('height', '100%');
});
$('#overlay-close-button').click(function() {
	$('.fa-bars').prop('aria-expanded', 'false');
	$('#nav-overlay').css('height', '0%');
});

reposition();

$('#social-media img').on('mouseenter', function() {
	var src = $(this).attr('src').replace('.png','-black.png');
	$(this).attr('src',src);
}).on('mouseleave', function() {
	var src = $(this).attr('src').replace('-black.png','.png');
	$(this).attr('src',src);
});

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

var nav = 'phat';

// on device rotation, reload page
$(window).on('orientationchange', function() {
	location.reload();
});

$(window).resize(function(e) {
	reposition();
});

// HEADER: shrink/grow
var headerHeight = null;
var header_parallax = 3;

$(document).scroll(function(e) {
	var scroll = $(document).scrollTop();

	adjustHeader(scroll);
});

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

$('input[name="submitButton"]').addClass('btn btn-secondary');

console.log('finished loading base/script.js');