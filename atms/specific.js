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
var pass_gift = {
    id: 203,
    name: 'Gift a Mammoth Pass',
    category: 'Annual Pass',
    price: 'variable'
}
var mammoth = [];
mammoth.adult = pass_adult;
mammoth.child = pass_child;
mammoth.youth = pass_youth;
mammoth.senior = pass_senior;
mammoth.family = pass_family;
mammoth.gift = pass_gift;

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
        // check what's going into the cart
        if (params == null || params.length == 0) {
            return true;
        } else if (params.sch.length > 0) {
            // viewing the admissions calendar
            var adults = $('#pricing_101\\:12\\:_').val();
            var seniors = $('#pricing_109\\:12\\:_').val();
            var youths = $('#pricing_102\\:12\\:_').val();
            var children = $('#pricing_108\\:12\\:_').val();

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
            gtag('event', 'add_to_cart', {
                'items' : items
            });
        } else if (params.item.length > 0) {
            // viewing a mammoth pass
        }
        return true;
    });

    $('input[title="Remove"]').on('click', function(event) {
        // remove item from cart
        // event.preventDefault();
        var parent = $(this).parent('tr');
        var item_name = $(parent).find('td.CartType').text();
        var item_quantity = parseInt($(parent).find('td.CartQuantity').text().replace('$',''));
        var item_price = parseInt($(parent).find('td.CartPrice').text().replace('$',''));
        var item_id = null;

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
            // return true;
        }

        var removeItem = {
            'id' : item_id,
            'name' : item_name ,
            'category' : 'Admissions',
            'price' : item_price,
            'quantity' : item_quantity
        };

        // console.log('HALTED');

        // console.log(removeItem);
        gtag('event', 'remove_from_cart', {
            'items' : [removeItem]
        });

        return true;
    });
})();

function ATMS(parameters) {
    // set params globally
    params = parameters;

    // we can only get intent here; no hard data
    switch (window.location.pathname) {
        case '/ram/Default.aspx':
            if (params == null) {
                return;
            }

            if (params.tagId.length > 0) {
                // viewing a specific category of items
                var tagId = parseInt(params.tagId);
                switch (tagId) {
                    case 1:
                        // admissions
                        break;
                    case 2:
                        // learning
                        break;
                    case 3:
                        // annual pass
                        break;

                }
            }
            // viewing all of our offerings
            console.log('viewing Sales Homepage');
            gtag('event', 'view_item_list', {
                'items' : [
                    {
                        'id' : 12,
                        'name' : 'Admission',
                        'category' : 'Admissions',
                        'price' : 'variable',
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
                        'price' : 'variable',
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
                    },
                ]
            });
            break;
        case '/ram/DateSelection.aspx':
            // user is checking calendar for dates for general admission
            console.log('viewing Admission date selection');

            break;
        case '/ram/Selection.aspx':
            // user has selected a date or chosen a mammoth pass
            // if there's a sch variable, it's a date selected for admission
            if (params.length == 0) {
                console.log("ERROR: No parameters provided.");
                return;
            } else if (params.sch.length > 0) {
                // date selected to purchase admission
                
            } else if (params.item.length > 0) {
                // mammoth pass selected for viewing
                var item = parseInt(params.item);
                var item_name = 'undetermined';
                var item_category = 'undetermined';
                var item_price = 'undetermined';
                
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
                        item_price = 'undetermined';
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
            // nothing to be tracked here (so delete case?)
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
                    } else if (item_name == admiission.youth) {
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