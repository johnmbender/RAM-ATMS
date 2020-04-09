var vars = getUrlVars();
var amount = parseInt(vars.trnAmount);
var orderNumber = vars.trnOrderNumber;

if (vars.errorMessage == null) {
    dataLayer = window.dataLayer || [];
    dataLayer.push({
        'event': 'checkout',
        'ecommerce': {
            'currencyCode': 'CAD',
            'checkout': {
                'actionField': {
                    'step': 2,
                    'option': 'Payment Information'
                }
            }
        }
    });
}