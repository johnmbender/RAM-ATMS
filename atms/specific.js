/**
 * 
 # @atms/specific.js

NOTE: while in Selection.aspx, I also saw SaleResponse.aspx, which seems AJAX-y
*/

var params = null;

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
var mammoth = [];
mammoth.adult = pass_adult;
mammoth.child = pass_child;
mammoth.youth = pass_youth;
mammoth.senior = pass_senior;
mammoth.family = pass_family;

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

(() => {
    // EVENT CATCHERS
    $('input#AddToOrder.PrimaryAction').on('click', function(event) {
        event.preventDefault();
        console.log("HALTED");

        // check what's going into the cart
        if (params == null || params.length == 0) {
            console.log('NO PARAMS');
            return true;
        } else if (params.sch.length > 0) {
            console.log('viewing admissions calendar');
            // viewing the admissions calendar
            var adults = $('#pricing_101\\:12\\:_').val();
            var seniors = $('#pricing_109\\:12\\:_').val();
            var youths = $('#pricing_102\\:12\\:_').val();
            var children = $('#pricing_108\\:12\\:_').val();

            if ((adults + seniors + youths + children) == 0) {
                // no tickets added...
                console.log('no tickets added');
                return true;
            }

            console.log('tickets added:');

            var items = [];
            if (adults > 0) {
                var adultTickets = admission.adult;
                adultTickets.quantity = adults;
                items.push(adultTickets);
                console.log(adults + ' adult ticket(s) added');
            }
            if (seniors > 0) {
                var seniorTickets = admission.senior;
                seniorTickets.quantity = seniors;
                items.push(seniorTickets);
                console.log(seniors + ' senior ticket(s) added');
            }
            if (youths > 0) {
                var youthTickets = admission.youth;
                youthTickets.quantity = youths;
                items.push(youthTickets);
                console.log(youths + ' youth ticket(s) added');
            }
            if (children > 0) {
                var childTickets = admission.child;
                childTickets.quantity = seniors;
                items.push(childTickets);
                console.log(children + ' child ticket(s) added');
            }

            if (items.length == 0) {
                console.log('no items created to add to cart');
                return;
            }

            console.log('items added to cart:');
            console.log(items);

            gtag('event', 'add_to_cart', {
                'items' : items
            });
            console.log('EVENT SENT TO GTAG');
        } else if (params.item.length > 0) {
            console.log('viewing mammoth passes');
            // viewing a mammoth pass
            var item_id = parseInt(params.item);
            var items = [];

            console.log('viewing id ' + item_id);

            switch (item_id) {
                case 16:
                    // adult pass
                    var new_item = mammoth.adult;
                    new_item.quantity = $('#pricing_116\\:16\\:_').val();
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
                    new_item.quantity = $('#pricing_119\\:17\\:_').val();
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
                    new_item.quantity = $('#pricing_120\\:18\\:_').val();
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
                    new_item.quantity = $('#pricing_177\\:19\\:_').val();
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
                    new_item.quantity = $('#pricing_177\\:19\\:_').val();
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
                    var gift_adult = $('#pricing_465\\:203\\:_').val();
                    var gift_senior = $('#pricing_467\\:203\\:_').val();
                    var gift_youth = $('#pricing_469\\:203\\:_').val();
                    var gift_family = $('#pricing_478\\:203\\:_').val();

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
})();

function ATMS(parameters) {
    // set params globally
    console.log('ATMS called with parameters:');
    console.log(parameters);
    params = parameters;
    console.log('params are now:');
    console.log(params);

    // we can only get intent here; no hard data
    switch (window.location.pathname) {
        case '/ram':
        case '/ram/':
        case '/ram/Default.aspx':
            if (params == null) {
                // viewing all items
                console.log('View Sales Homepage');
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
            } else if (params.tagId.length > 0) {
                // viewing a specific category of items
                var tagId = parseInt(params.tagId);
                switch (tagId) {
                    case 1:
                        // admissions
                        gtag('event', 'view_item_list', {
                            'items' : [{
                                'id' : 1,
                                'name' : 'Admissions',
                                'category' : 'Admissions'
                            }]
                        });
                        break;
                    case 2:
                        // learning
                        break;
                    case 3:
                        // annual pass
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
                        break;
                    default:
                        // no action
                        break;
                }
            }
            break;
        case '/ram/DateSelection.aspx':
            // user is checking calendar for dates for general admission
            console.log('viewing Admission date selection');
            gtag('event', 'view_item', {
                'items' : [
                    {
                        'id' : 1,
                        'name' : 'Admission Calendar',
                        'category' : 'Admissions'
                    }
                ]
            });
            break;
        case '/ram/Selection.aspx':
            // user has selected a date or chosen a mammoth pass
            if (params.length == 0) {
                console.log("ERROR: No parameters provided.");
                return;
            } else if (params.sch.length > 0) {
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
            } else if (params.item.length > 0) {
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