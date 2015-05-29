Ext.define('FO.store.Foods', {
    extend: 'Ext.data.Store',
    model: 'FO.model.Food',
    proxy: {
        type: 'ajax'
    }
});