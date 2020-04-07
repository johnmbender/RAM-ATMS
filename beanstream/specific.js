var vars = getUrlVars();
var amount = parseInt(vars.trnAmount);

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