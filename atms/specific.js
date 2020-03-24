/**
 * 
 # @atms/specific.js

NOTE: while in Selection.aspx, I also saw SaleResponse.aspx, which seems AJAX-y

default.aspx
    default page, selection of all objects
    VARS:
        - tagId
            1: admissions
            2: learning
            3: annual pass
        - from, until
            a date object in m/dd/yyyy format, with slashes URL-encoded to %2f

DateSelection.aspx
    VARS:
        - item
            12: General Admission calendar view
            16: Mammoth Pass (adult)
            17: Mammoth Pass (senior)
            18: Mammoth Pass (youth)
            19: Mammoth Pass (child)
            20: Mammoth Pass (family)
            203: Mammoth Pass (gift)

Selection.aspx
    VARS:
        - sch
            a unique ID schedule that's not entirely coherent for reporting without
            a direct link to ATMS
    
    JS Elements:
        - select#pricing_101: adult admission
        - select#pricing_109: senior admission
        - select#pricing_102: youth admission
        - select#pricing_108: child admission

OrderSummary.aspx
    JS Elements:
        - td.CartType
        - td.CartQuantity
        - td.CartPrice (includes "$")
        - td.CartTotal (includes "$")
        - td.CartFinalTotal strong (includes "$" and "CDN")
        - p.Amount (includes "$")

Login.aspx

OrderContact.aspx (click Continue as Guest)
    JS Elements:
        - input#AddressPostalCode

OrderCheckout.aspx
    JS Elements: (SAME AS OrderSummary, so maybe just one?)
        - td.CartType
        - td.CartQuantity
        - td.CartPrice (includes "$")
        - td.CartTotal (includes "$")
        - td.CartFinalTotal strong (includes "$" and "CDN")
        - p.Amount (includes "$")
    
    IMPORTANT:
        - input#Continue.PrimaryAction (when pressed, goes to Beanstream)
            ... might be able to scrape this:
            https://www.beanstream.com/scripts/payment/payment.asp?merchant_id=117585724&trnType=P&trnOrderNumber=231020&ref1=842f239a-8deb-4cbc-9706-0f9a3aac273d&trnAmount=39.00&hashValue=ba5b656de55d74b7fdbe31e14d90fdca1bc8f16e&ref2=&ref3=&ordName=John+Bender&ordEmailAddress=fuddyq%40gmail.com&ordPhoneNumber=7804861546
                - trnOrderNumber
                - ref1 (?)
                - trnAmount (total amount)
                - hashValue (?)
                - ref2 (is blank in this example)
                - ref3 (is blank in this example)
                - ordName (name as filled in on previous form, URL-encoded)
                - ordEmailAddress (email address as filled in on previous form, URL-encoded)
                - ordPhoneNumber (number as filled in on previous form)
 */

 /* GA TAG template
    gtag('event', 'purchase', {
    "transaction_id": "24.031608523954162",
    "affiliation": "Google online store",
    "value": 23.07,
    "currency": "USD",
    "tax": 1.24,
    "shipping": 0,
    "items": [
        {
        "id": "P12345",
        "name": "Android Warhol T-Shirt",
        "list_name": "Search Results",
        "brand": "Google",
        "category": "Apparel/T-Shirts",
        "variant": "Black",
        "list_position": 1,
        "quantity": 2,
        "price": '2.0'
        },
        {
        "id": "P67890",
        "name": "Flame challenge TShirt",
        "list_name": "Search Results",
        "brand": "MyBrand",
        "category": "Apparel/T-Shirts",
        "variant": "Red",
        "list_position": 2,
        "quantity": 1,
        "price": '3.0'
        }
    ]
    });
*/

(() => {
    // event-catching

    // $('#pricing_116:16:_').on('change', function() {
    //     // changing number of adult Mammoth passes
    //     var quantity = parseInt($(this).val());
    //     var price = 35.00;
    //     var totalValue = quantity * price;

    //     gtag('event', 'add_to_cart', {
    //         'value' : totalValue,
    //         'currency' : 'CAD',
    //         'items' : [
    //             {
    //                 'id' : '16',
    //                 'name' : 'Adult Mammoth Pass',
    //                 'category' : 'Annual Pass',
    //                 'quantity' : quantity,
    //                 'price' : price
    //             }
    //         ]
    //     });
    // });
})();

function ATMS(params) {
    // we can only get intent here; no hard data
    switch (window.location.pathname) {
        case '/ram/Default.aspx':
            // viewing all of our offerings
            console.log('viewing Sales Homepage');
            break;
        case '/ram/DateSelection.aspx':
            // user is checking calendar for dates for general admission
            console.log('viewing Admission date selection');
            break;
        case '/ram/Selection.aspx':
            // user has selected a date or chosen a mammoth pass
            if (params.length == 0) {
                console.log("ERROR: No parameters provided.");
                return;
            } else if (params.item == null) {
                console.log("ERROR: No ITEM provided.");
                return;
            }
            var item = parseInt(params.item);
            var item_name = 'undetermined';
            var item_category = 'undetermined';
            var item_price = 'undetermined';
            
            switch (item) {
                case 16:
                    item_name = 'Adult Mammoth Pass';
                    item_category = 'Membership';
                    item_price = 35.00;
                    break;
                case 17:
                    item_name = 'Senior Mammoth Pass';
                    item_category = 'Membership';
                    item_price = 30.00;
                case 18:
                    item_name = 'Youth Mammoth Pass';
                    item_category = 'Membership';
                    item_price = 20.00;
                case 19:
                    item_name = 'Child Mammoth Pass';
                    item_category = 'Membership';
                    item_price = 0.00;
                case 20:
                    item_name = 'Family Mammoth Pass';
                    item_category = 'Membership';
                    item_price = 70.00;
                case 203:
                    item_name = 'Gift Mammoth Pass';
                    item_category = 'Membership';
                    item_price = 'undetermined';
                default:
                    console.log('No item value?');
                    return;
            }

            // post to Analytics
            gtag('event', 'view_item', {
                'items' : [
                    {
                        'id' : item,
                        'name' : item_name,
                        'category' : item_category,
                        'price' : item_price
                    }
                ]
            });

            break;
        case '/ram/OrderSummary.aspx':
            // user is viewing cart
            break;
        case '/ram/OrderRegistrants.aspx':
            // user is entering names on tickets (not using for now)
            break;
        case '/ram/OrderCheckout.aspx':
            // reviewing cart after logging in; last stop before beanstream
            break;
        case '/ram/OrderResponse.aspx':
            // user has successfully purchased; GET variable "order" links to beanstream's "ref1" variable
            // var orderNumber = params.trnOrderNumber;
            // ga('ec:setAction', 'purchase', {
            // 'id': orderNumber,
            // 'revenue': params.trnAmount
            // });
            // ga('send', 'pageview');
            break;
    }
}