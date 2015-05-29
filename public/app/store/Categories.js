Ext.define('FO.store.Categories', {
    extend: 'Ext.data.Store',
    model: 'FO.model.Category',
    proxy: {
        type: 'ajax',
        url: 'data/categories.json'
    }
});