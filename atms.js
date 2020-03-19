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
	$('#overlay-close-button').css({
		left: $('.fa-bars').offset().left,
		top: $('.fa-bars').offset().top - $('#nav-and-search').css('margin-top')
	});
}

$(window).resize(function(e) {
	reposition();
});

$('input[name="submitButton"]').addClass('btn btn-secondary');

if (window.location.host == 'atms.alberta.ca') {
	ATMS();
} else if (window.location.host == 'www.beanstream.com') {
	BeanStream();
}

function ATMS() {
	// we can only get intent here; no hard data
	var params = retrieveURLparams();

	switch (window.location.pathname) {
		case '/ram/Default.aspx':
			// viewing all of our offerings
			ga('ec:addImpression', {
				'id': '0',
				'name': 'All RAM Items',
				'category': 'general',
			});
			ga('send', 'pageview');
			break;
		case '/ram/DateSelection.aspx':
			// user is checking calendar for dates for general admission
			ga('ec:addImpression', {
				'id': '12',
				'name': 'General Admission Calendar',
				'category': 'admission'
			});
			ga('send', 'pageview');
			break;
		case '/ram/Selection.aspx':
			// user has selected a date or chosen a mammoth pass
			if (params.sch) {
				// presence of variable "sch" indicates a date is chosen for general admission
				// grab the date (not sure if I can find a place for it, however)
				var selectedDate = $('.ItemDetails h4').text();
				// set an onSubmit event with the "add to order" button to grab the selection(s)
				$('#AddToOrder').on('click', function(e) {
					var adult = $('.ErrorInput').eq(0).val();
					var senior = $('.ErrorInput').eq(1).val();
					var youth = $('.ErrorInput').eq(2).val();
					var child = $('.ErrorInput').eq(3).val();

					if (adult > 0) {
						ga('ec:addProduct', {
						  'id': '1',
						  'name': 'Adult Admission',
						  'category': 'Admission',
						  'price': '19.00',
						  'quantity': adult
						});
					}
					if (senior > 0) {
						ga('ec:addProduct', {
						  'id': '2',
						  'name': 'Senior Admission',
						  'category': 'Admission',
						  'price': '14.00',
						  'quantity': senior
						});
					}
					if (youth > 0) {
						ga('ec:addProduct', {
						  'id': '3',
						  'name': 'Youth Admission',
						  'category': 'Admission',
						  'price': '10.00',
						  'quantity': youth
						});
					}
					if (child > 0) {
						ga('ec:addProduct', {
						  'id': '4',
						  'name': 'Child Admission',
						  'category': 'Admission',
						  'price': '0.00',
						  'quantity': child
						});
					}
					ga('send', 'pageview');

					return true;
				});
			} else {
				$('#AddToOrder').on('click', function(e) {
					var mammothPassType = "";
					var mammothPassPrice = "";
					var quantity = $('.ErrorInput').val();

					switch (params.item) {
						case 16:
							mammothPassPrice = "35.00";
							mammothPassType = "Adult Mammoth Pass";
							break;
						case 17:
							mammothPassPrice = "30.00";
							mammothPassType = "Senior Mammoth Pass";
							break;
						case 18:
							mammothPassPrice = "20.00";
							mammothPassType = "Youth Mammoth Pass";
							break;
						case 19:
							mammothPassPrice = "0.00";
							mammothPassType = "Child Mammoth Pass";
							break;
						case 20:
							mammothPassPrice = "70.00";
							mammothPassType = "Family Mammoth Pass";
							break;
					}

					ga('ec:addProduct', {
					  'id': params.item,
					  'name': mammothPassType,
					  'category': 'Mammoth Pass',
					  'price': mammothPassPrice,
						'quantity': quantity
					});
					ga('send', 'pageview');
				});
			}

			break;
		case '/ram/OrderSummary.aspx':
			// user is viewing cart
			break;
		case '/ram/OrderRegistrants.aspx':
			// user is entering names on tickets (not using for now)
			break;
		case '/ram/OrderCheckout.aspx':
			// reviewing cart after logging in; last stop before beanstream
			break;
		case '/ram/OrderResponse.aspx':
			// user has successfully purchased; GET variable "order" links to beanstream's "ref1" variable
			var orderNumber = params.trnOrderNumber;
			ga('ec:setAction', 'purchase', {
			  'id': orderNumber,
			  'revenue': params.trnAmount
			});
			ga('send', 'pageview');
			break;
	}
}

function BeanStream() {
	// hard data lives here
	switch (window.location.pathname) {
		case '/scripts/payment/payment.asp':
			// ref1 is our key for confirmation pointing to ATMS' "order" variable
			// trnAmount is the total dollar value processing
			ga('ec:setAction','checkout', {
			    'step': 1,
			    'option': 'Credit Card'
			});
			ga('send', 'pageview');
			break;
		case 'OTHERS':
			// CC declined, etc. capture? or no?
			break;
	}
}

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
