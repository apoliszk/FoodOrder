Ext.define('FO.view.OrderPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.orderpanel',
    autoScroll: true,
    items: [{
        xtype: 'component',
        itemId: 'view',
        margin: '5, 5, 5, 5',
        tpl: '<table class="order-table"><tr><td>订单号：</td><td>{orderId}</td><td>下单时间：</td><td>{time}</td></tr><tpl for="shoppingCartItems"><tr><td>{name}</td><td colspan="3">{count}份</td></tr></tpl><tr><td>总价：</td><td colspan="3">￥{totalPrice}</td></tr></table>'
    }],

    initComponent: function () {
        var me = this;

        me.addEvents(
            'cancelfoodorder'
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
                    xtype: 'button',
                    itemId: 'cancelOrderBtn',
                    text: '取消订单',
                    width: 200,
                    cls: 'btn-obvious',
                    trackOver: true,
                    overCls: 'btn-obvious-over',
                    scale: 'large',
                    disabled: true,
                    handler: me.cancelFoodOrder,
                    scope: me
                }]
            }]
        });

        me.callParent(arguments);
    },

    cancelFoodOrder: function () {
        this.setButtonEnable(false);
        this.fireEvent('cancelfoodorder', this);
    },

    setButtonEnable: function (enabled) {
        this.down('#cancelOrderBtn').setDisabled(!enabled);
    },

    updateView: function (records) {
        var enabled = false;
        var view = this.down('#view');
        if (records && records.length > 0) {
            enabled = true;
            view.show();
            view.update(records[0].getData());
        } else {
            view.hide();
        }
        this.setButtonEnable(enabled);
    }
});