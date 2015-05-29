Ext.define('FO.store.ShoppingCartFoods', {
    extend: 'Ext.data.Store',
    model: 'FO.model.ShoppingCartItem',
    autoLoad: false
});