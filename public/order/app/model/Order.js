Ext.define('FO.model.Order', {
    extend: 'Ext.data.Model',
    fields: [
        'orderId', 'time', 'shoppingCartItems', 'totalPrice'
    ],
    proxy: {
        type: 'ajax',
        url: 'order',
        writer: 'json',
        reader: 'json'
    }
});
