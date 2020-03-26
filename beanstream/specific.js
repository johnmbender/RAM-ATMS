/**
 * 
 # @beanstream/specific.js
*/
var params;

(() => {
    params = retrieveURLparams();
    // event-catching
    eventCatchers();
    pageLoad();
})();

function eventCatchers() {
    // event catchers here, if necessary
}

function pageLoad() {
    // hard data lives here
    switch (window.location.pathname) {
        case '/scripts/payment/payment.asp':
            // ref1 is our key for confirmation pointing to ATMS' "order" variable
            // trnAmount is the total dollar value processing
            var cartValue = 0;
            if (params.length == 0) {
                return true;
            }
            if (params.trnAmount.length == 0) {
                return true;
            }

            cartValue = params.trnAmount;
            gtag('event', 'checkout_progress', {
                'value' : cartValue,
                'checkout_step' : 2
            });
            break;
        case 'OTHERS':
            // CC declined, etc. capture? or no?
            break;
    }
}