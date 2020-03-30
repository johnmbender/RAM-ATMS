/**
 * 
 # @atms/specific.js

NOTE: while in Selection.aspx, I also saw SaleResponse.aspx, which seems AJAX-y
*/

// store Mammoth Pass and Admission info in global vars
var mammoth = [];
var admission = [];

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
    var pass_adult = {
        id: 16,
        name: 'Adult Mammoth Pass',
        category: 'Annual Pass',
        price: 35.00
    };
    var pass_child = {
        id: 19,
        name: 'Child Mammoth Pass',
        category: 'Annual Pass',
        price: 0.00
    };
    var pass_youth = {
        id: 18,
        name: 'Youth Mammoth Pass',
        category: 'Annual Pass',
        price: 20.00
    };
    var pass_senior = {
        id: 17,
        name: 'Senior Mammoth Pass',
        category: 'Annual Pass',
        price: 30.00
    };
    var pass_family = {
        id: 20,
        name: 'Family Mammoth Pass',
        category: 'Annual Pass',
        price: 70.00
    };
    mammoth.adult = pass_adult;
    mammoth.child = pass_child;
    mammoth.youth = pass_youth;
    mammoth.senior = pass_senior;
    mammoth.family = pass_family;

    // Admissions info
    var admission = [];
    var admission_adult = {
        id: 101,
        name: 'Public Adult (18 to 64)',
        category: 'Admissions',
        price: 19.00,
        quantity: 0
    };
    var admission_senior = {
        id: 109,
        name: 'Public Senior (65+)',
        category: 'Admissions',
        price: 14.00,
        quantity: 0
    };
    var admission_youth = {
        id: 102,
        name: 'Public Youth (7 to 17)',
        category: 'Admissions',
        price: 10.00,
        quantity: 0
    };
    var admission_child = {
        id: 108,
        name: 'Public Child (6 and under)',
        category: 'Admissions',
        price: 0.00,
        quantity: 0
    };
    admission.adult = admission_adult;
    admission.senior = admission_senior;
    admission.youth = admission_youth;
    admission.child = admission_child;
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
            console.log('EVENT SENT TO GTAG');
        } else if (params.item != null) {
            console.log('viewing mammoth passes');
            // viewing a mammoth pass
            var item_id = parseInt(params.item);
            var items = [];

            console.log('viewing id ' + item_id);

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

    $('input[title="Remove"]').on('click', function(event) {
        // remove item from cart
        var parent = $(this).parent('tr');
        var item_type = $(parent).find('td.CartItem.first p strong').text().trim();
        var item_name = $(parent).find('td.CartType').text();
        var item_quantity = parseInt($(parent).find('td.CartQuantity').text().replace('$',''));
        var item_price = parseInt($(parent).find('td.CartPrice').text().replace('$',''));
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
}

function pageLoad() {
    console.log('pageLoad() called');
    switch (window.location.pathname.toLowerCase()) {
        case '/ram':
        case '/ram/':
        case '/ram/default.aspx':
            console.log('looking at ' + window.location.pathname);
            if (params == null) {
                console.log('no params');
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
        case '/ram/DateSelection.aspx':
            // user is checking calendar for dates for general admission
            // we don't need to track anything as there's no intent yet
            break;
        case '/ram/Selection.aspx':
            if (params != null) console.table(params);

            // user has selected a date or chosen a mammoth pass
            if (params == null) {
                console.assert(params == null, 'No parameters!');
                return;
            } else if (params.sch != null) {
                // date (sch) selected to purchase admission
                gtag('event', 'view_item', {
                    'items' : [
                        {
                            'id' : 1,
                            'name' : 'Admission Ticket Selection',
                            'category' : 'Admissions'
                        }
                    ]
                });
            } else if (params.item != null) {
                // mammoth pass selected for viewing
                var item = parseInt(params.item);
                var item_name = 'undetermined';
                var item_category = 'undetermined';
                var item_price = null;
                
                switch (item) {
                    case 16:
                        item_name = 'Adult Mammoth Pass';
                        item_category = 'Annual Pass';
                        item_price = 35.00;
                        break;
                    case 17:
                        item_name = 'Senior Mammoth Pass';
                        item_category = 'Annual Pass';
                        item_price = 30.00;
                        break;
                    case 18:
                        item_name = 'Youth Mammoth Pass';
                        item_category = 'Annual Pass';
                        item_price = 20.00;
                        break;
                    case 19:
                        item_name = 'Child Mammoth Pass';
                        item_category = 'Annual Pass';
                        item_price = 0.00;
                        break;
                    case 20:
                        item_name = 'Family Mammoth Pass';
                        item_category = 'Annual Pass';
                        item_price = 70.00;
                        break;
                    case 203:
                        item_name = 'Gift Mammoth Pass';
                        item_category = 'Annual Pass';
                        break;
                    default:
                        console.log('No item value?');
                        return;
                }

                // post to Analytics
                gtag('event', 'view_item', {
                    'items' : [
                        {
                            'id' : item,
                            'name' : item_name,
                            'category' : item_category,
                            'price' : item_price
                        }
                    ]
                });
            }

            break;
        case '/ram/OrderSummary.aspx':
            // user is viewing cart
            
            break;
        case '/ram/Login.aspx':
            // user needs to Login or continue as Guest
            
            break;
        case '/ram/OrderContact.aspx':
            // user is using the Guest checkout option
            // ...?
            break;
        case '/ram/OrderRegistrants.aspx':
            // user is entering names on tickets (not using for now)
            break;
        case '/ram/OrderCheckout.aspx':
            // reviewing cart after logging in; last stop before beanstream
            // gather cart info
            var items = [];
            var totalCartValue = 0;

            $.each($('#ShoppingCart tbody tr'), function(i, item) {
                var item_category = $(item).first('.CartItem strong').text();
                var item_name = $(item).first('.CartType span em').text();
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
                    // NEED TO COMPLETE
                } else if (item_category == 'SOME OTHER?') {
                    // NEED TO COMPLETE?
                } else {
                    // unknown category, or category couldn't be retrieved
                    return true;
                }

                if (item_id == null) {
                    return true;
                }

                var item_quantity = parseInt($(item).first('.CartQuantity').text().replace('$',''));
                var item_price = parseInt($(item).first('.CartPrice').text().replace('$',''));
                var item_total = parseInt($(item).first('.CartTotal').text().replace('$',''));
                
                items.push({
                    'id' : item_id,
                    'category' : item_category,
                    'name' : item_name,
                    'price' : item_price,
                    'quantity' : item_quantity
                });
                totalCartValue += item_price * item_quantity;
            });

            if (items.length == 0) {
                return true;
            }

            gtag('event', 'begin_checkout', {
                'items' : items,
                'value' : totalCartValue
            });
            break;
        case '/ram/OrderResponse.aspx':
            // I dunno, man... need to do a real sale

            break;
    }
}