/**
 * 
 # @atms/specific.js

NOTE: while in Selection.aspx, I also saw SaleResponse.aspx, which seems AJAX-y
*/

// store Mammoth Pass and Admission info in global vars
var mammoth = {};
var admission= {};

// get any page parameters
var params = retrieveURLparams();

// load the Mammoth Pass and Admission info
loadItems();

// gather any event catchers that will catch when user interacts with the page
eventCatchers();

// process any gtag events based on the current page load
pageLoad();

function loadItems() {
    // Mammoth Pass info
    mammoth.adult = {
        id: 16,
        name: 'Adult Mammoth Pass',
        category: 'Annual Pass',
        price: 35.00
    };
    mammoth.child = {
        id: 19,
        name: 'Child Mammoth Pass',
        category: 'Annual Pass',
        price: 0.00
    };
    mammoth.youth = {
        id: 18,
        name: 'Youth Mammoth Pass',
        category: 'Annual Pass',
        price: 20.00
    };
    mammoth.senior = {
        id: 17,
        name: 'Senior Mammoth Pass',
        category: 'Annual Pass',
        price: 30.00
    };
    mammoth.family = {
        id: 20,
        name: 'Family Mammoth Pass',
        category: 'Annual Pass',
        price: 70.00
    };

    // Admissions info
    admission.adult = {
        id: 101,
        name: 'Public Adult (18 to 64)',
        category: 'Admissions',
        price: 19.00,
        quantity: 0
    };
    admission.senior = {
        id: 109,
        name: 'Public Senior (65+)',
        category: 'Admissions',
        price: 14.00,
        quantity: 0
    };
    admission.youth = {
        id: 102,
        name: 'Public Youth (7 to 17)',
        category: 'Admissions',
        price: 10.00,
        quantity: 0
    };
    admission.child = {
        id: 108,
        name: 'Public Child (6 and under)',
        category: 'Admissions',
        price: 0.00,
        quantity: 0
    };
}

function eventCatchers() {
    // EVENT CATCHERS
    $('a.js-select-date').on('click', function() {
        // catch the selected date on Admission calendar click
        var selected_date = $(this).attr('data-scheduledate');
        gtag('event', 'select_content', {
            'items' : [],
            'content_type' : 'Admissions',
            'content_id' : selected_date
        });
    });

    $('input#AddToOrder.PrimaryAction').on('click', function(event) {
        // check what's going into the cart
        if (params == null) {
            return true;
        } else if (params.sch != null) {
            console.log('adding admission item(s) to cart');
            // viewing the admissions calendar
            var adults = parseInt($('#pricing_101\\:12\\:_').val());
            var seniors = parseInt($('#pricing_109\\:12\\:_').val());
            var youths = parseInt($('#pricing_102\\:12\\:_').val());
            var children = parseInt($('#pricing_108\\:12\\:_').val());

            if ((adults + seniors + youths + children) == 0) {
                // no tickets added...
                return true;
            }

            var items = [];
            if (adults > 0) {
                var adultTickets = admission.adult;
                adultTickets.quantity = adults;
                items.push(adultTickets);
            }
            if (seniors > 0) {
                var seniorTickets = admission.senior;
                seniorTickets.quantity = seniors;
                items.push(seniorTickets);
            }
            if (youths > 0) {
                var youthTickets = admission.youth;
                youthTickets.quantity = youths;
                items.push(youthTickets);
            }
            if (children > 0) {
                var childTickets = admission.child;
                childTickets.quantity = seniors;
                items.push(childTickets);
            }

            if (items.length == 0) {
                return;
            }
            
            gtag('event', 'add_to_cart', {
                'items' : items
            });
        } else if (params.item != null) {
            console.log('viewing mammoth passes');
            // viewing a mammoth pass
            var item_id = parseInt(params.item);
            var items = [];

            switch (item_id) {
                case 16:
                    // adult pass
                    var new_item = mammoth.adult;
                    new_item.quantity = parseInt($('#pricing_116\\:16\\:_').val());
                    if (new_item.quantity == 0) {
                        return true;
                    } else if (new_item.quantity > 1) {
                        new_item.name = new_item.name + 'es';
                    }
                    new_item.value = new_item.quantity * new_item.price;
                    items.push(new_item);
                    console.log('adult mammoth pass(es) added:');
                    console.log(new_item);
                    break;
                case 17:
                    // senior pass
                    var new_item = mammoth.senior;
                    new_item.quantity = parseInt($('#pricing_119\\:17\\:_').val());
                    if (new_item.quantity == 0) {
                        return true;
                    } else if (new_item.quantity > 1) {
                        new_item.name = new_item.name + 'es';
                    }
                    new_item.value = new_item.quantity * new_item.price;
                    items.push(new_item);
                    console.log('senior mammoth pass(es) added:');
                    console.log(new_item);
                    break;
                case 18:
                    // youth pass
                    var new_item = mammoth.youth;
                    new_item.quantity = parseInt($('#pricing_120\\:18\\:_').val());
                    if (new_item.quantity == 0) {
                        return true;
                    } else if (new_item.quantity > 1) {
                        new_item.name = new_item.name + 'es';
                    }
                    new_item.value = new_item.quantity * new_item.price;
                    items.push(new_item);
                    console.log('youth mammoth pass(es) added:');
                    console.log(new_item);
                    break;
                case 19:
                    // child pass
                    var new_item = mammoth.child;
                    new_item.quantity = parseInt($('#pricing_177\\:19\\:_').val());
                    if (new_item.quantity == 0) {
                        return true;
                    } else if (new_item.quantity > 1) {
                        new_item.name = new_item.name + 'es';
                    }
                    new_item.value = new_item.quantity * new_item.price;
                    items.push(new_item);
                    console.log('child mammoth pass(es) added:');
                    console.log(new_item);
                    break;
                case 20:
                    // family pass
                    var new_item = mammoth.family;
                    new_item.quantity = parseInt($('#pricing_177\\:19\\:_').val());
                    if (new_item.quantity == 0) {
                        return true;
                    } else if (new_item.quantity > 1) {
                        new_item.name = new_item.name + 'es';
                    }
                    new_item.value = new_item.quantity * new_item.price;
                    items.push(new_item);
                    console.log('family mammoth pass(es) added:');
                    console.log(new_item);
                    break;
                case 203:
                    console.log('viewing gift mammoth passes');
                    // gift pass (multiple)
                    var gift_adult = parseInt($('#pricing_465\\:203\\:_').val());
                    var gift_senior = parseInt($('#pricing_467\\:203\\:_').val());
                    var gift_youth = parseInt($('#pricing_469\\:203\\:_').val());
                    var gift_family = parseInt($('#pricing_478\\:203\\:_').val());

                    if ((gift_adult + gift_senior + gift_youth + gift_family) == 0) {
                        console.log('no gift passes added');
                        return true;
                    }

                    console.log('gift pass(es) added...');

                    var items = [];
                    var totalValue = 0;
                    if (gift_adult > 0) {
                        var new_item = mammoth.adult;
                        new_item.quantity = gift_adult;
                        new_item.value = new_item.quantity * new_item.price;
                        new_item.name = 'Gifted Adult Annual Pass';
                        if (new_item.quantity > 1) {
                            new_item.name = new_item.name + 'es';
                        }
                        totalValue += new_item.value;
                        items.push(new_item);
                        console.log('adult gift mammoth pass(es) added:');
                        console.log(new_item);
                    }
                    if (gift_senior > 0) {
                        var new_item = mammoth.senior;
                        new_item.quantity = gift_senior;
                        new_item.value = new_item.quantity * new_item.price;
                        new_item.name = 'Gifted Senior Annual Pass';
                        if (new_item.quantity > 1) {
                            new_item.name = new_item.name + 'es';
                        }
                        totalValue += new_item.value;
                        items.push(new_item);
                        console.log('senior gift mammoth pass(es) added:');
                        console.log(new_item);
                    }
                    if (gift_youth > 0) {
                        var new_item = mammoth.youth;
                        new_item.quantity = gift_youth;
                        new_item.value = new_item.quantity * new_item.price;
                        new_item.name = 'Gifted Youth Annual Pass';
                        if (new_item.quantity > 1) {
                            new_item.name = new_item.name + 'es';
                        }
                        totalValue += new_item.value;
                        items.push(new_item);
                        console.log('youth gift mammoth pass(es) added:');
                        console.log(new_item);
                    }
                    if (gift_family > 0) {
                        var new_item = mammoth.family;
                        new_item.quantity = gift_family;
                        new_item.value = new_item.quantity * new_item.price;
                        new_item.name = 'Gifted Family Annual Pass';
                        if (new_item.quantity > 1) {
                            new_item.name = new_item.name + 'es';
                        }
                        totalValue += new_item.value;
                        items.push(new_item);
                        console.log('family gift mammoth pass(es) added:');
                        console.log(new_item);
                    }

                    if (items.length == 0) {
                        console.log('no gift passes added');
                        return true;
                    }

                    console.log("gift pass(es) added:");
                    console.log(items);

                    gtag('event', 'add_to_cart', {
                        'items' : [ items ],
                        'value' : totalValue
                    });
                    console.log('ITEMS SENT TO GTAG');
                default:
                    // shouldn't occur, but less pass
                    console.log('default hit');
                    return true;
            }

            if (items.length != 1) {
                console.log('non-gift mammoth passes not added?');
                return true;
            }

            console.log('pass(es) added:');
            console.log(items);

            gtag('event', 'add_to_cart', {
                'items' : [ items ],
                'value' : items[0].value
            });
            console.log('ITEMS SENT TO GTAG');
        }
        console.log('o hai');
        return true;
    });

    // handle items being removed from cart
    $('input[title="Remove"]').on('click', function(event) {
        // remove item from cart
        var parentRow = $(this).closest('tr');
        var item_type = $(parentRow).find('td.CartItem.first p strong').text().trim();
        var item_name = $(parentRow).find('td.CartType').text().trim();
        var item_quantity = parseInt($(parentRow).find('td.CartQuantity').text().trim().replace('$',''));
        var item_price = parseInt($(parentRow).find('td.CartPrice').text().trim().replace('$',''));
        var item_id = null;
        var category = null;

        if (item_type == 'Admission') {
            category = 'Admissions';

            if (item_name == admission.adult.name) {
                item_id = admission.adult.id;
            } else if (item_name == admission.youth.name) {
                item_id = admission.youth.id;
            } else if (item_name == admission.senior.name) {
                item_id = admission.senior.id;
            } else if (item_name == admission.child.name) {
                item_id = admission.child.id;
            } else {
                // no match, but don't stop processing
                return true;
            }
        } else if (item_type == 'Annual Pass') { // ??
            category = 'Annual Pass';
        }

        var removeItem = {
            'id' : item_id,
            'name' : item_name,
            'category' : 'Admissions',
            'price' : item_price,
            'quantity' : item_quantity
        };

        gtag('event', 'remove_from_cart', {
            'items' : [removeItem]
        });

        return true;
    });

    // handle submit cart to shipping/login
    $('input[name="SelectShipping"]').on('click', function(event) {
        // ?
    });

    // handle guest registration form, and assume it was successful :/
    $('input[name="SaveGuest"]').on('click', function(event) {
        // we can guess if the form was filled out correctly, at least
        if (checkInfoForm()) {
            // submit assumed guest login
            gtag('event', 'login', {
                'method' : 'guest'
            });
        }
    });

    $('input#LogIn').on('click', function(event) {
        // check to see if an email and password exists, and consider it a login :/
    });
}

function checkInfoForm(password_check) {
    var email1 = $('#EmailAddress').val().trim();
    var email2 = $('#EmailAddress').val().trim();
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var firstname = $('#FirstName').val().trim();
    var lastname = $('#LastName').val().trim();
    var phone = $('#PhoneNumber').val().trim().replace(/[^\d]/g, '');
    var address = $('#AddressLine1').val().trim();
    var city = $('#AddressCity').val().trim();
    var postal = $('#AddressPostalCode').val().trim();
    var postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    var province = $('#AddressProvinceSelect').val();

    if (password_check) {
        var password1 = $('#Password').val().trim();
        var password2 = $('#ConfirmPassword').val().trim();

        if (password1.length == 0 ||
            password1 != password2) {
            // MORE CHECKS HERE FROM BRANDON
            return false;
        }
    }

    if (email1.length > 0 && emailRegex.test(email1.toLowerCase()) && email1 == email2 &&
        firstname.length > 0 && lastname.length > 0 &&
        phone.length > 6 && phone.length < 11 &&
        address.length > 0 && city.length > 0 &&
        postalRegex.test(postal.toLowerCase()) &&
        province.length > 0) {
        // assumed success
        return true;
    } else {
        // assumed failure
        return false;
    }
}

function pageLoad() {
    var pathname = window.location.pathname.toLowerCase();
    switch (pathname) {
        case '/ram':
        case '/ram/':
        case '/ram/default.aspx':
            console.log('looking at ' + pathname);
            if (params == null || (params != null) && params.tagid != null && parseInt(params.tagid) == 0) {
                console.log('no params, or all items');
                // viewing all items
                gtag('event', 'view_item_list', {
                    'items' : [
                        {
                            'id' : 12,
                            'name' : 'Admission',
                            'category' : 'Admissions',
                            'position' : 1
                        },
                        {
                            'id' : 16,
                            'name' : 'Adult Mammoth Pass',
                            'category' : 'Annual Pass',
                            'price' : 35.00,
                            'position' : 2
                        },
                        {
                            'id' : 19,
                            'name' : 'Child Mammoth Pass',
                            'category' : 'Annual Pass',
                            'price' : 0.00,
                            'position' : 3
                        },
                        {
                            'id' : 20,
                            'name' : 'Family Mammoth Pass',
                            'category' : 'Annual Pass',
                            'price' : 70.00,
                            'position' : 4
                        },
                        {
                            'id' : 203,
                            'name' : 'Gift Mammoth Pass',
                            'category' : 'Annual Pass',
                            'position' : 5
                        },
                        {
                            'id' : 17,
                            'name' : 'Senior Mammoth Pass',
                            'category' : 'Annual Pass',
                            'price' : 30.00,
                            'position' : 6
                        },
                        {
                            'id' : 18,
                            'name' : 'Youth Mammoth Pass',
                            'category' : 'Annual Pass',
                            'price' : 20.00,
                            'position' : 7
                        }
                    ]
                });
                console.log('gtag sent');
            } else if (params.tagid != null) {
                console.table(params);
                // viewing a specific category of items
                var tagid = parseInt(params.tagid);
                console.log('tagId: ' + tagid);
                switch (tagid) {
                    case 1:
                        // admissions
                        console.log('admissions');
                        gtag('event', 'view_item_list', {
                            'items' : [{
                                'id' : 1,
                                'name' : 'Admissions',
                                'category' : 'Admissions'
                            }]
                        });
                        console.log('gtag sent');
                        break;
                    case 2:
                        // learning (programs?)
                        console.log('learning');
                        gtag('event', 'view_item_list', {
                            'items' : [{
                                'id': 2,
                                'name' : 'Learning',
                                'category' : 'Learning'
                            }]
                        });
                        console.log('gtag sent');
                        break;
                    case 3:
                        // annual pass
                        console.log('annual pass');
                        gtag('event', 'view_item_list', {
                            'items' : [
                                {
                                    'id' : 16,
                                    'name' : 'Adult Mammoth Pass',
                                    'category' : 'Annual Pass',
                                    'price' : 35.00,
                                    'position' : 1
                                },
                                {
                                    'id' : 19,
                                    'name' : 'Child Mammoth Pass',
                                    'category' : 'Annual Pass',
                                    'price' : 0.00,
                                    'position' : 2
                                },
                                {
                                    'id' : 20,
                                    'name' : 'Family Mammoth Pass',
                                    'category' : 'Annual Pass',
                                    'price' : 70.00,
                                    'position' : 3
                                },
                                {
                                    'id' : 203,
                                    'name' : 'Gift Mammoth Pass',
                                    'category' : 'Annual Pass',
                                    'position' : 4
                                },
                                {
                                    'id' : 17,
                                    'name' : 'Senior Mammoth Pass',
                                    'category' : 'Annual Pass',
                                    'price' : 30.00,
                                    'position' : 4
                                },
                                {
                                    'id' : 18,
                                    'name' : 'Youth Mammoth Pass',
                                    'category' : 'Annual Pass',
                                    'price' : 20.00,
                                    'position' : 6
                                }
                            ]
                        });
                        console.log('gtag sent');
                        break;
                    default:
                        // no action
                        break;
                }
            }
            break;
        case '/ram/dateselection.aspx':
            console.log('dateSelection page for admissions');
            gtag('event', 'view_item', {
                'items' : [
                    {
                        'id' : 1,
                        'name' : 'Admission Tickets Date Selection',
                        'category' : 'Admissions'
                    }
                ]
            });
            console.log('gtag sent');
            // user is checking calendar for dates for general admission
            // we don't need to track anything as there's no intent yet
            break;
        case '/ram/selection.aspx':
            if (params != null) console.table(params);

            // user has selected a date or chosen a mammoth pass
            if (params == null) {
                console.assert(params == null, 'No parameters!');
                return;
            } else if (params.sch != null) {
                // date (sch) selected to purchase admission
                console.log('viewing a selected date for purchasing admission');
                gtag('event', 'view_item', {
                    'items' : [
                        {
                            'id' : 1,
                            'name' : 'Admission Ticket(s) Selection',
                            'category' : 'Admissions'
                        }
                    ]
                });
                console.log('gtag sent');
            } else if (params.item != null) {
                // mammoth pass selected for viewing
                console.log('viewing Mammoth Pass:');
                var item = parseInt(params.item);
                var viewed_item;
                viewed_item.name = 'undetermined';
                viewed_item.category = 'undetermined';
                viewed_item.price = null;
                
                switch (item) {
                    case 16:
                        viewed_item.name = 'Adult Mammoth Pass';
                        viewed_item.category = 'Annual Pass';
                        viewed_item.price = 35.00;
                        break;
                    case 17:
                        viewed_item.name = 'Senior Mammoth Pass';
                        viewed_item.category = 'Annual Pass';
                        viewed_item.price = 30.00;
                        break;
                    case 18:
                        viewed_item.name = 'Youth Mammoth Pass';
                        viewed_item.category = 'Annual Pass';
                        viewed_item.price = 20.00;
                        break;
                    case 19:
                        viewed_item.name = 'Child Mammoth Pass';
                        viewed_item.category = 'Annual Pass';
                        viewed_item.price = 0.00;
                        break;
                    case 20:
                        viewed_item.name = 'Family Mammoth Pass';
                        viewed_item.category = 'Annual Pass';
                        viewed_item.price = 70.00;
                        break;
                    case 203:
                        viewed_item.name = 'Gift Mammoth Pass';
                        viewed_item.category = 'Annual Pass';
                        break;
                    default:
                        console.log('No item value?');
                        return;
                }

                console.log('posting:');
                console.log(viewed_item);
                // post to Analytics
                gtag('event', 'view_item', {
                    'items' : [viewed_item]
                });
                console.log('gtag sent');
            }

            break;
        case '/ram/ordersummary.aspx':
            // user is viewing cart, here begins checkout
            var gtagObject = calculateCart();
            if (gtagObject.items.length > 0) {
                // value CAN be 0, if there's only a child's admission or pass, for example
                gtag('event', 'begin_checkout', gtagObject);
            }
            break;
        case '/ram/login.aspx':
            // if param action exists and is "verify" variable exists, user account is created
            if (params != null && params.action != null && params.action == "verify") {
                gtag('event', 'sign_up', {
                    'method' : 'account'
                });
            }
            break;
        case '/ram/ordercontact.aspx':
            // Guest checkout option
            // there isn't an obvious way to see if guest registration was complete,
            // so we'll guess it was successful on the submit button (eventCatcher)
            break;
        case '/ram/orderregistrants.aspx':
            // user is entering names on tickets (not using for now)
            break;
        case '/ram/register.aspx':

            break;
        case '/ram/ordercheckout.aspx':
            // reviewing cart after logging in; last stop before beanstream
            // gather cart info
            var gtagObject = calculateCart();

            if (gtagObject.items.length > 0) {
                // value CAN be 0, if there's only a child's admission or pass, for example
                // add checkout step, which we will assume is 2 (JOVI)
                gtagObject.checkout_step = 2;
                gtag('event', 'checkout_progress', gtagObject);    
            }

            break;
        case '/ram/orderresponse.aspx':
            // I dunno, man... need to do a real sale

            break;
        case '/ram/ordercheckoutresponse.aspx':
            // I know this works as a decline, but will have to check on success
            if (params != null & params.trnApproved != null) {
                // trnApproved == 0 on decline
                // should also have a trnAmount either way, but
                // my first test was a malformed URL, so re-check
                if (params.trnApproved == false) {
                    // declined... what do we do here?
                } else if (params.trnApproved == true) {
                    // approved, send purchase complete gtag
                    // purchase	transaction_id, value, currency, tax, shipping, items, coupon
                    var purchase_value = params.trnAmount != null ? params.trnAmount : null;
                    var purchase_id = params.trnId != null ? params.trnId : null;
                    // https://atms.alberta.ca/ram/OrderCheckoutResponse.aspx?trnApproved=0&trnId=&messageId=804&messageText=Declined+%2D+Entered+Information+Cannot+Be+Authenticated&authCode=&responseType=T&trnAmount=&trnDate=3%2F31%2F2020+3%3A57%3A16+PM&trnOrderNumber=231020&trnLanguage=eng&trnCustomerName=&trnEmailAddress=&trnPhoneNumber=&avsProcessed=0&avsId=0&avsResult=0&avsAddrMatch=0&avsPostalMatch=0&avsMessage=Address+Verification+not+performed+for+this+transaction%2E&cardType=&trnType=&paymentMethod=&riskScore=0&ref1=842f239a%2D8deb%2D4cbc%2D9706%2D0f9a3aac273d&ref2=&ref3=&ref4=&ref5=&hashValue=f84cab16660e8085cd28b913671c54e2d1feacd3
                    gtag('event', 'purchase', {
                        'transaction_id' : purchase_id,
                        'value' : purchase_value
                    });
                }
            }
            break;
    }
}

function calculateCart() {
    var gtagObject = {};
    var items = [];
    var totalCartValue = 0;

    $.each($('#ShoppingCart tbody tr'), function(i, item) {
        var item_category = $(item).first('.CartItem strong').text().trim();
        var item_name = $(item).first('.CartType span em').text().trim();
        var item_id = null;

        if (item_category == 'Admission') {
            item_category = 'Admissions'; // odd inconsistency on ATMS
            if (item_name == admission.adult.name) {
                item_id = admission.adult.id;
            } else if (item_name == admission.senior) {
                item_id = admission.senior.id;
            } else if (item_name == admission.youth) {
                item_id = admission.youth.id;
            } else if (item_name == admission.child) {
                item_id = admission.child.id;
            }
        } else if (item_category == 'MAMMOTH PASS?') {
            // NEED TO COMPLETE JOVI
        } else if (item_category == 'SOME OTHER?') {
            // NEED TO COMPLETE? JOVI
        } else {
            // unknown category, or category couldn't be retrieved
        }

        if (item_id != null) {
            var item_quantity = parseInt($(item).first('.CartQuantity').text().trim().replace('$',''));
            var item_price = parseInt($(item).first('.CartPrice').text().trim().replace('$',''));
            
            items.push({
                'id' : item_id,
                'category' : item_category,
                'name' : item_name,
                'price' : item_price,
                'quantity' : item_quantity
            });
            totalCartValue += item_price * item_quantity;
        }
    });

    gtagObject.value = totalCartValue;
    gtagObject.items = items;

    return gtagObject;
}