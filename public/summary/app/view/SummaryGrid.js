Ext.define('SUM.view.SummaryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.summarygrid',
    store: Ext.create('SUM.store.SummaryGridItems'),
    enableColumnHide: false,
    enableColumnMove: false,
    columnLines: true,
    columns: [{
        text: '名称',
        dataIndex: 'name',
        flex: 1
    }, {
        text: '单价',
        dataIndex: 'price',
        flex: 1,
        renderer: function (v) {
            return "￥" + v;
        }
    }, {
        text: '数量',
        dataIndex: 'count',
        flex: 1
    }, {
        xtype: 'actioncolumn',
        width: 50,
        items: [{
            icon: '../images/detail.gif',
            handler: function (grid, rowIndex, colIndex) {
                grid.up('summarygrid').fireEvent('showdetail', grid.getStore().getAt(rowIndex));
            }
        }]
    }],

    initComponent: function () {
        var me = this;

        me.addEvents(
            'showdetail'
        );

        Ext.apply(me, {
            dockedItems: [{
                xtype: 'container',
                dock: 'bottom',
                padding: '5 0 5 0',
                layout: {
                    type: 'hbox',
                    align: 'middle'
                },
                items: [{
                    xtype: 'component',
                    itemId: 'totalLabel',
                    html: '总计：￥0',
                    cls: 'total-label'
                }]
            }]
        });
        me.callParent(arguments);

        me.store.on({
            datachanged: {
                scope: me,
                fn: me.updateTotalPrice
            },
            update: {
                scope: me,
                fn: me.updateTotalPrice
            }
        });
    },

    updateTotalPrice: function () {
        var price = 0;
        var len = this.store.data.length;
        var data;
        for (var i = 0; i < len; i++) {
            data = this.store.getAt(i);
            price += data.get('price') * data.get('count');
        }
        this.down('#totalLabel').getEl().setHTML('总计：￥' + price);
    }
});