Ext.define('SUM.store.Orders', {
    extend: 'Ext.data.Store',
    model: 'SUM.model.Order',
    storeId: 'ordersSummaryStore',
    proxy: {
        type: 'ajax',
        url: 'order'
    }
});