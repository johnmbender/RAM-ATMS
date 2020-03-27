/**
 * 
 # @beanstream/specific.js
*/
var params = retrieveURLparams();
eventCatchers();
pageLoad();

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
            if (params == null) {
                return true;
            }
            if (params.trnAmount == null) {
                return true;
            }

            cartValue = params.trnAmount;
            gtag('event', 'checkout_progress', {
                'value' : cartValue,
                'checkout_step' : 2
            });
            break;
    }
}