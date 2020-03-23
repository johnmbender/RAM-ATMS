/**
 * 
 # @beanstream/specific.js
*/
function BeanStream() {
    // hard data lives here
    switch (window.location.pathname) {
        case '/scripts/payment/payment.asp':
            // ref1 is our key for confirmation pointing to ATMS' "order" variable
            // trnAmount is the total dollar value processing
            print('let us see...');
            gtag('event', 'page_view', {
                'name' : 'Credit Card form'
            });
            break;
        case 'OTHERS':
            // CC declined, etc. capture? or no?
            break;
    }
}