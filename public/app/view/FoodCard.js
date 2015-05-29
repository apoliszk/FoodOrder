Ext.define('FO.view.FoodCard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.foodcard',
    width: 200,
    height: 230,
    margin: '5 0 0 5',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    data: null,

    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            items: [{
                xtype: 'image',
                itemId: 'foodImg',
                width: 200,
                height: 200
            }, {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'middle'
                },
                width: 200,
                height: 30,
                padding: '0 5 0 5',
                items: [{
                    xtype: 'component',
                    itemId: 'foodDesc',
                    flex: 1,
                    tpl: '<div class="food-desc"><span class="food-price">￥{price}</span> {name}</div>'
                }, {
                    xtype: 'button',
                    text: '添加',
                    cls: 'btn-obvious',
                    trackOver: true,
                    overCls: 'btn-obvious-over',
                    handler: me.addFoodBtnClickHandler,
                    scope: me
                }]
            }]
        });
        this.addEvents(
            'addfood'
        );
        this.callParent(arguments);
        this.bind(this.data);
    },

    bind: function (record) {
        this.child('#foodImg').setSrc(record.get('pic'));
        this.down('#foodDesc').update(record.getData());
    },

    addFoodBtnClickHandler: function () {
        this.fireEvent('addfood', this, this.data);
    }
});