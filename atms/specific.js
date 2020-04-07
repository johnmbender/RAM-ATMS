var vars = getUrlVars();

// hide public pricing if member is logged in
if ($('#MemberPricing').length > 0) {
    $('#PublicPricing').closest('.Section').remove();
}

switch (window.location.pathname.toLowerCase()) {
    case '/ram':
    case '/ram/':
    case '/ram/default.aspx':
        // item listings; if a tagId param exists, viewing a category
        var category = 'ALL';
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
                'category' : category,
                'position' : item_position
            };
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
        var item_id = parseInt(params.item);

        var pricingBox = ($('#MemberPricing').length > 0) ? $('#MemberPricing') : $('#PublicPricing');
        var products = [];

        for (var i = 0; i < $(pricingBox).find('.Type').length; i++) {
            var new_product = {};
            new_product.name = item_name;
            new_product.id = item_id;

            var item_price = parseInt($(pricingBox).find('.Price').eq(i).find('label').text().trim().replace('$',''));
            new_product.price = item_price;

            var variant = $(pricingBox).find('.Type').text().trim();
            if (variant != 'Merchandise Cost') {
                new_product.variant = variant;
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

        var add_button = $('.ButtonArea #AddToOrder').on('click', function() {
            var added_products = [];

            for (var i = 0; i < $(pricingBox).find('.Type').length; i++) {
                var new_product = {};

                var item_quantity = parseInt($(pricingBox).find('.Amount').eq(i).find('select').val());
                // only add items to cart if item quantity isn't 0, duh
                if (item_quantity > 0) {
                    new_product.quantity = item_quantity;
                    new_product.name = item_name;
                    new_product.id = item_id;

                    var item_price = parseInt($(pricingBox).find('.Price').eq(i).find('label').text().trim().replace('$',''));
                    new_product.price = item_price;

                    var variant = $(pricingBox).find('.Type').text().trim();
                    if (variant != 'Merchandise Cost') {
                        new_product.variant = variant;
                    }

                    products.push(new_product);
                }
            }


            var item_quantity = $('.Amount select').val();

            if (item_quantity == 0) {
                return false;
            }

            dataLayer.push({
                'event': 'addToCart',
                'ecommerce': {
                    'currencyCode': 'CAD',
                    'add': {
                        'products': [
                            {
                                'name': item_name,
                                'id': item_id,
                                'price': item_price,
                                'quantity': item_quantity
                            }
                        ]
                    }
                }
            });
            return true;
        });
        break;

    case '/ram/ordersummary.aspx':
        // viewing a cart
        var cartItems = [];

        // add items to array
        $.each($('#ShoppingCart table tbody tr'), function(i, itemRow) {
            var item_name = $(itemRow).find('.CartItem p strong').text().trim();
            var item_quantity = parseInt($(itemRow).find('.CartQuantity').text().trim());
            var item_price = parseInt($(itemRow).find('.CartPrice').text().trim().replace('$', ''));
            var item_total = parseInt($(itemRow).find('.CartTotal').text().trim().replace('$', ''));

            var cart_item = {
                'name' : item_name,
                'id' : item_id,
                'price' : item_price,
                'quantity' : item_quantity
            };
            cartItems.push(cart_item);

            // add remove click tracking
            $(itemRow).find('input[title="Remove"]').on('click', function() {
                dataLayer.push({
                    'event' : 'removeFromCart',
                    'ecommerce' : {
                        'remove' : {
                            'products' : [ cart_item ]
                        }
                    }
                });
            });
        });

        // not sure we care about shipping costs?
        var shipping_cost = parseInt($('#ShippingOptions .Price').text().trim().replace('$',''));

        // could also get GST, but guessing that's not important

        if (cartItems.length > 0) {
            dataLayer.push({
                'event': 'checkout',
                'ecommerce': {
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
            var item_price = parseInt($(itemRow).find('.CartPrice').text().trim().replace('$', ''));
            var item_total = parseInt($(itemRow).find('.CartTotal').text().trim().replace('$', ''));

            var cart_item = {
                'name' : item_name,
                'id' : item_id,
                'price' : item_price,
                'quantity' : item_quantity
            };
            cartItems.push(cart_item);
        });

        var cart_tax = parseInt($('.CartTax').eq(0).find('strong').text().trim().replace('$',''));
        var cart_total = parseInt($('.CartFinalTotal strong').text().replace('$','').replace('CDN','').trim());
        var cart_gst = parseInt($('.CartTax').eq(1).text().replace('GST Included: ','').replace('$','').trim());

        if (cartItems.length > 0) {
            dataLayer.push({
                'event': 'checkout',
                'ecommerce': {
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

        if (products.length > 0) {
            dataLayer.push({
                'ecommerce': {
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