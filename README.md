# eCommerce
Javascript/CSS file hosting because Drupal is terrible.

This allows ATMS and Beanstream to use separate CSS and JS files not hosted on the ever-caching Drupal site.

TO-DO:
- create one main CSS file and one main JavaScript file for both ATMS and Beanstream in root
- split the specific CSS and JavaScript for ATMS and Beanstream into their respective folders

ATMS folder contains:
- atms.js: handles basic site functions, but needs to handle more accurate google tag manager tracking for eCommerce tracking
- atms.css: handles styling for ATMS-specific elements
- atms.html: HTML template to be adjusted and emailed to support@vantixsystems.com for updating ATMS

Beanstream folder contains:
- beanstream.js: handles basic site functions, but needs to handle more accurate google tag manager tracking for eCommerce tracking
- beanstream.css: handles styling for Beanstream-specific elements
- beanstream.html: HTML template to put into the beanstream backend, split between header and footer accordingly