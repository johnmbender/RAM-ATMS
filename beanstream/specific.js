var vars = getUrlVars();
var amount = parseInt(vars.trnAmount);
var orderNumber = parseInt(vars.trnOrderNumber);

if (vars.errorMessage == null) {
    dataLayer.push({
        'event': 'checkout',
        'ecommerce': {
            'checkout': {
                'actionField': {
                    'step': 3,
                    'option': 'Payment Information'
                }
            }
        }
    });
}