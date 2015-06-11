Ext.define('FO.view.CategoryList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.categorylist',

    store: Ext.create('FO.store.Categories'),

    initComponent: function () {
        this.addEvents(
            'selectionchange'
        );
        this.callParent(arguments);

        this.store.load({
            callback: this.createView,
            scope: this
        });
    },

    createView: function () {
        this.view = Ext.create('widget.dataview', {
            autoScroll: true,
            store: this.store,
            selModel: {
                mode: 'SINGLE',
                listeners: {
                    scope: this,
                    selectionchange: this.onSelectionChange
                }
            },
            trackOver: true,
            cls: 'category-list',
            itemSelector: 'div.category-list-item',
            overItemCls: 'category-list-item-hover',
            tpl: '<tpl for="."><div class="category-list-item">{name}</div></tpl>'
        });
        this.add(this.view);

        if (this.store.getTotalCount()) {
            this.view.getSelectionModel().select(this.store.getAt(0));
        }
    },

    onSelectionChange: function () {
        var selected = this.getSelectedItem();
        if (selected) {
            this.fireEvent('selectionchange', this, selected);
        }
    },

    getSelectedItem: function () {
        return this.view.getSelectionModel().getSelection()[0] || false;
    }
});