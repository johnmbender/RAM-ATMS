var vars = getUrlVars();
var member = null;

// hide public pricing if member is logged in
if ($('#MemberPricing').length > 0) {
    $('#PublicPricing').closest('.Section').remove();
    member = true;
}

if (window.location.hostname == 'atmsuat.alberta.ca') {
    console.log('working on UAT');
    return;
}

console.log('working on prod');

switch (window.location.pathname.toLowerCase()) {
    case '/ram':
    case '/ram/':
    case '/ram/default.aspx':
        // item listings; if a tagId param exists, viewing a category
        var category = null;
        if (vars.tagid != null) {
            category = $('h1').text().trim();
        }

        var impressions = [];

        // loop through .EventListing for what content is visible
        $.each($('.EventListing'), function(i, item) {
            // get name of item from the h2 tag
            var item_name = $(item).find('h2').text().trim();

            // gather the id from the purchase button
            var href = $(item).find('a.PrimaryAction').prop('href');
            var params = getUrlVars(href);
            var item_id = parseInt(params.item);

            // default to page 1 if there is no page variable
            var page = (vars.page == null) ? 1 : parseInt(vars.page);
            var item_position = ((page-1) * 10) + (i + 1);

            var impression = {
                'name' : item_name,
                'id' : item_id,
                'position' : item_position
            };
            if (category != null) {
                impression.category = category;
            }
            impressions.push(impression);
        });

        if (impressions.length > 0) {
            dataLayer.push({
                'ecommerce' : {
                    'currencyCode' : 'CAD',
                    'impressions' : impressions
                }
            });
        }

        break;
    case '/ram/selection.aspx':
        // viewing an item
        var item_name = $('.EventInfo .EventInfoRight h2').text().trim();
        var item_id = parseInt(vars.item);

        var pricingBox = ($('#MemberPricing').length > 0) ? $('#MemberPricing') : $('#PublicPricing');
        var products = [];

        for (var i = 0; i < $(pricingBox).find('.Type').length; i++) {
            var new_product = {};
            new_product.name = item_name;
            new_product.id = item_id;

            var item_price = parseFloat($(pricingBox).find('.Price').eq(i).find('label').text().trim().replace('$','')).toFixed(2);
            new_product.price = item_price;

            var variant = $(pricingBox).find('.Type').eq(i).text().trim();
            if (variant != 'Merchandise Cost') {
                new_product.variant = variant;
            }

            if (member) {
                new_product.coupon = 'member';
            }

            products.push(new_product);
        }

        if (products.length > 0) {
            dataLayer.push({
                'ecommerce': {
                    'currencyCode': 'CAD',
                    'detail': {
                        'products': products
                    }
                }
            });
        }

        var add_button = $('.ButtonArea #AddToOrder').on('click', function(event) {
            event.preventDefault();
            var thisAddButton = $(this);
            var added_products = [];

            for (var i = 0; i < $(pricingBox).find('.Type').length; i++) {
                var new_product = {};

                var item_quantity = parseInt($(pricingBox).find('.Amount').eq(i).find('select').val());
                // only add items to cart if item quantity isn't 0, duh
                if (item_quantity > 0) {
                    new_product.quantity = item_quantity;
                    new_product.name = item_name;
                    new_product.id = item_id;

                    var item_price = parseFloat($(pricingBox).find('.Price').eq(i).find('label').text().trim().replace('$','')).toFixed(2);
                    new_product.price = item_price;

                    var variant = $(pricingBox).find('.Type').eq(i).text().trim();
                    if (variant != 'Merchandise Cost') {
                        new_product.variant = variant;
                    }

                    if (member) {
                        new_product.coupon = 'member';
                    }

                    products.push(new_product);
                }
            }

            if (added_products.length > 0) {
                console.log('products added...');
                dataLayer.push({
                    'event': 'addToCart',
                    'ecommerce': {
                        'currencyCode': 'CAD',
                        'add': {
                            'products': added_products
                        }
                    },
                    'eventCallback': function() {
                        $(thisAddButton).unbind('click').click();
                    }
                });
            } else {
                console.log('no added products?');
                $(thisAddButton).unbind('click').click();
            }
        });
        break;

    case '/ram/ordersummary.aspx':
        // viewing a cart
        var cartItems = [];

        // add items to array
        $.each($('#ShoppingCart table tbody tr'), function(i, itemRow) {
            var item_name = $(itemRow).find('.CartItem p strong').text().trim();
            var item_quantity = parseInt($(itemRow).find('.CartQuantity').text().trim());
            var item_price = parseFloat($(itemRow).find('.CartPrice').text().trim().replace('$', '')).toFixed(2);
            var item_total = parseFloat($(itemRow).find('.CartTotal').text().trim().replace('$', '')).toFixed(2);

            var cart_item = {
                'name' : item_name,
                'id' : item_id,
                'price' : item_price,
                'quantity' : item_quantity
            };
            if (member) {
                cart_item.coupon = 'member';
            }
            cartItems.push(cart_item);

            // add remove click tracking
            $(itemRow).find('input[title="Remove"]').on('click', function(event) {
                event.preventDefault();
                var thisRemoveButton = $(this);

                dataLayer.push({
                    'event' : 'removeFromCart',
                    'ecommerce' : {
                        'currencyCode': 'CAD',
                        'remove' : {
                            'products' : [ cart_item ]
                        }
                    },
                    'eventCallback': function() {
                        $(thisRemoveButton).unbind('click').click();
                    }
                });
            });
        });

        // not sure we care about shipping costs?
        var shipping_cost = parseFloat($('#ShippingOptions .Price').text().trim().replace('$','')).toFixed(2);

        // could also get GST, but guessing that's not important

        if (cartItems.length > 0) {
            dataLayer.push({
                'event': 'checkout',
                'ecommerce': {
                    'currencyCode': 'CAD',
                    'checkout': {
                        'actionField': {
                            'step': 1,
                            'option': 'Order Summary'
                        },
                        'products': cartItems
                    }
                }
            });
        }
        break;

    case '/ram/ordercheckout.aspx':
        // user is logged in, has a full cart
        var cartItems = [];

        // add items to array
        $.each($('#ShoppingCart table tbody tr'), function(i, itemRow) {
            var item_name = $(itemRow).find('.CartItem p strong').text().trim();
            var item_quantity = parseInt($(itemRow).find('.CartQuantity').text().trim());
            var item_price = parseFloat($(itemRow).find('.CartPrice').text().trim().replace('$', '')).toFixed(2);
            var item_total = parseFloat($(itemRow).find('.CartTotal').text().trim().replace('$', '')).toFixed(2);

            var cart_item = {
                'name' : item_name,
                'id' : item_id,
                'price' : item_price,
                'quantity' : item_quantity
            };

            if (member) {
                cart_item.coupon = 'member';
            }
            cartItems.push(cart_item);
        });

        var cart_tax = parseFloat($('.CartTax').eq(0).find('strong').text().trim().replace('$','')).toFixed(2);
        var cart_total = parseFloat($('.CartFinalTotal strong').text().replace('$','').replace('CDN','').trim()).toFixed(2);
        var cart_gst = parseFloat($('.CartTax').eq(1).text().replace('GST Included: ','').replace('$','').trim()).toFixed(2);

        if (cartItems.length > 0) {
            dataLayer.push({
                'event': 'checkout',
                'ecommerce': {
                    'currencyCode': 'CAD',
                    'checkout': {
                        'actionField': {
                            'step': 2,
                            'option': 'Order Checkout'
                        },
                        'products': cartItems
                    }
                }
            });
        }
        break;
    case '/ram/COMPLETED_URL':
        // we need to get transaction_id
        // which is available in beanstream's URL...
        var transaction_id = null;

        // calculate revenue ...?
        // tax, shipping, total
        var revenue = 0;

        // calculate tax ...?
        var tax = 0;

        // calculate shipping ...?
        var shipping = 0;

        // get products ...?
        // {
        //     'name': 'Triblend Android T-Shirt',     // Name or ID is required.
        //     'id': '12345',
        //     'price': '15.25',
        //     'quantity': 1
        // }
        var products = [];
        // DON'T forget member coupon

        if (products.length > 0) {
            dataLayer.push({
                'ecommerce': {
                    'currencyCode': 'CAD',
                    'purchase': {
                        'actionField': {
                            'id': transaction_id,
                            'affiliation': 'Online Store',
                            'revenue': revenue,
                            'tax': tax,
                            'shipping': shipping
                        },
                        'products': products
                    }
                }
            });
        }
        break;

}