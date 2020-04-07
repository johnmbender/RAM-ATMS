var vars = getUrlVars();

switch (window.location.pathname.toLowerCase()) {
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

        break;

    case '/ram/ordersummary.aspx':
        // viewing a cart

        break;
    
}