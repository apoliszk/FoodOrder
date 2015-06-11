Ext.define('FO.view.ShoppingCartGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.shoppingcartgrid',
    store: Ext.create('FO.store.ShoppingCartFoods'),

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },

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
        flex: 1,
        editor: {
            xtype: 'numberfield',
            allowBlank: false,
            minValue: 1,
            maxValue: 1000
        }
    }, {
        xtype: 'actioncolumn',
        width: 50,
        items: [{
            icon: '../images/delete.gif',
            handler: function (grid, rowIndex, colIndex) {
                grid.getStore().removeAt(rowIndex);
            }
        }]
    }
    ],

    initComponent: function () {
        var me = this;

        me.addEvents(
            'submitfoodorder'
        );

        Ext.apply(me, {
            dockedItems: [{
                xtype: 'container',
                dock: 'bottom',
                padding: '5 5 5 5',
                layout: {
                    type: 'hbox',
                    align: 'middle'
                },
                items: [{
                    xtype: 'component',
                    flex: '1'
                }, {
                    xtype: 'component',
                    itemId: 'totalLabel',
                    html: '总计：￥0',
                    cls: 'total-label'
                }, {
                    xtype: 'button',
                    itemId: 'submitOrderBtn',
                    text: '下单',
                    disabled: true,
                    margin: "0 0 0 40",
                    width: 200,
                    cls: 'btn-obvious',
                    trackOver: true,
                    overCls: 'btn-obvious-over',
                    scale: 'large',
                    handler: me.submitFoodOrder,
                    scope: me
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
        this.setButtonEnable(len > 0);
        this.down('#totalLabel').getEl().setHTML('总计：￥' + price);
    },

    submitFoodOrder: function () {
        this.fireEvent('submitfoodorder', this);
    },

    setButtonEnable: function (enabled) {
        this.down('#submitOrderBtn').setDisabled(!enabled);
    }
});