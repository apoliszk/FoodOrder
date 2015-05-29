Ext.define('FO.store.Orders', {
    extend: 'Ext.data.Store',
    model: 'FO.model.Order',
    proxy: {
        type: 'ajax',
        url: 'order'
    }
});