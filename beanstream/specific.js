/**
 * 
 # @beanstream/specific.js
*/
var params;

console.log('start');
params = retrieveURLparams();
// event-catching
eventCatchers();
pageLoad();
console.log('end');


function eventCatchers() {
    // event catchers here, if necessary
    console.log('eventCatchers');
}

function pageLoad() {
    console.log('pageLoad');
    // hard data lives here
    console.log(window.location.pathname);
    switch (window.location.pathname) {
        case '/scripts/payment/payment.asp':
            console.log('seriously WTF');
            // ref1 is our key for confirmation pointing to ATMS' "order" variable
            // trnAmount is the total dollar value processing
            var cartValue = 0;
            if (params == null) {
                console.log('no params?:');
                console.log(params);
                return true;
            }
            if (params.trnAmount == null) {
                console.log('no trnAmount?:');
                console.log(params.trnAmount);
                return true;
            }

            cartValue = params.trnAmount;
            console.log('cart value: ' + cartValue);
            gtag('event', 'checkout_progress', {
                'value' : cartValue,
                'checkout_step' : 2
            });
            console.log("I gtag'd?");
            break;
    }
    console.log('end of pageLoad()');
}