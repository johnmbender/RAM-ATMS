/**
 * 
 # @beanstream/specific.js
 */
(() => {
    function BeanStream() {
        // hard data lives here
        switch (window.location.pathname) {
            case '/scripts/payment/payment.asp':
                // ref1 is our key for confirmation pointing to ATMS' "order" variable
                // trnAmount is the total dollar value processing
                ga('ec:setAction','checkout', {
                    'step': 1,
                    'option': 'Credit Card'
                });
                ga('send', 'pageview');
                break;
            case 'OTHERS':
                // CC declined, etc. capture? or no?
                break;
        }
    }
})();