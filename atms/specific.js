var vars = getUrlVars();

switch (window.location.pathname.toLowerCase()) {
    case '/ram/default.aspx':
        // item listings; if a tagId param exists, viewing a category
        console.table(vars);
        break;
    case '/ram/selection.aspx':
        // viewing an item

        break;

    case '/ram/ordersummary.aspx':
        // viewing a cart

        break;
    
}