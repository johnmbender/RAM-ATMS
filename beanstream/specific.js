/**
 * 
 # @beanstream/specific.js
*/
(() => {
    // event-catching
    $('select[name="trnCardType"]').on('change', function() {
        console.log('triggered!');
        var totalValue = 42.00;
        var quantity = 2;
        var price = 21.00;
        gtag('event', 'add_to_cart', {
            'value' : totalValue,
            'currency' : 'CAD',
            'items' : [
                {
                    'id' : '16',
                    'name' : 'Adult Mammoth Pass',
                    'category' : 'Annual Pass',
                    'quantity' : quantity,
                    'price' : price
                }
            ]
        });
    });
})();

function BeanStream() {
    // hard data lives here
    switch (window.location.pathname) {
        case '/scripts/payment/payment.asp':
            // ref1 is our key for confirmation pointing to ATMS' "order" variable
            // trnAmount is the total dollar value processing
            gtag('event', 'page_view', {
                'name' : 'Credit Card form'
            });
            break;
        case 'OTHERS':
            // CC declined, etc. capture? or no?
            break;
    }
}