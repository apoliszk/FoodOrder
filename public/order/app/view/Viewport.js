Ext.define('FO.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    alias: 'widget.appviewport',
    requires: [
        'FO.view.CategoryList',
        'FO.view.FoodGrid',
        'FO.view.ShoppingCartGrid',
        'FO.view.OrderPanel'
    ],
    items: [{
        xtype: 'container',
        region: 'north',
        layout: {
            type: 'hbox',
            align: 'middle'
        },
        items: [{
            xtype: 'image',
            width: 112,
            height: 60,
            src: '../images/logo.png'
        }, {
            xtype: 'image',
            width: 153,
            height: 46,
            src: '../images/logo_txt.png',
            margin: '0 8 0 8'
        }, {
            xtype: 'component',
            flex: 1
        }, {
            xtype: 'component',
            itemId: 'userNameLabel',
            tpl: '<div class="user-name">欢迎：{ip}</div>'
        }]
    }, {
        xtype: 'categorylist',
        region: 'west',
        width: 240,
        margins: '0 5 0 0'
    }, {
        xtype: 'foodgrid',
        region: 'center'
    }, {
        xtype: 'tabpanel',
        plain: true,
        region: 'south',
        height: 240,
        layout: 'fit',
        split: true,
        items: [{
            xtype: 'shoppingcartgrid',
            title: '购物车'
        }, {
            xtype: 'orderpanel',
            title: '我的订单'
        }]
    }],

    updateUserNameLabel: function (user) {
        this.down('#userNameLabel').update(user.getData());
    }
});