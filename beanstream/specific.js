/**
 * 
 # @beanstream/specific.js
*/
(() => {
    // event-catching
    /*
    $('select[name="trnCardType"]').on('change', function() {
        console.log('changed card type to ' + $(this).val());
    });
    */
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