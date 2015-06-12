Ext.define('SUM.model.Order', {
    extend: 'Ext.data.Model',
    fields: [
        'orderId', 'user', 'time', 'items', 'price'
    ]
});