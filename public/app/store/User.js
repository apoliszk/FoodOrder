Ext.define('FO.store.User', {
    extend: 'Ext.data.Store',
    model: 'FO.model.User',
    proxy: {
        type: 'ajax',
        url: 'user'
    }
});