var vars = getUrlVars();
var amount = parseInt(vars.trnAmount);
var orderNumber = vars.trnOrderNumber;

if (vars.errorMessage == null) {
    dataLayer.push({
        'event': 'checkout',
        'ecommerce': {
            'currencyCode': 'CAD',
            'checkout': {
                'actionField': {
                    'step': 3,
                    'option': 'Payment Information'
                }
            }
        }
    });
}