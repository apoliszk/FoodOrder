Ext.define('FO.view.FoodGrid', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.foodgrid',
    requires: ['FO.view.FoodCard'],
    autoScroll: true,
    layout: 'column',

    refreshView: function (store) {
        Ext.suspendLayouts();

        this.removeAll(true);
        var len = store.data.length;
        var card;
        for (var i = 0; i < len; i++) {
            card = Ext.widget('foodcard', {
                data: store.getAt(i)
            });
            this.add(card);
        }

        Ext.resumeLayouts(true);
    }
});