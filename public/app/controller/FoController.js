Ext.define('FO.controller.FoController', {
    extend: 'Ext.app.Controller',
    stores: ['Foods', 'User', 'Orders'],
    refs: [
        {ref: 'categoryList', selector: 'categorylist'},
        {ref: 'foodGrid', selector: 'foodgrid'},
        {ref: 'shoppingCartGrid', selector: 'shoppingcartgrid'},
        {ref: 'appViewPort', selector: 'appviewport'},
        {ref: 'orderPanel', selector: 'orderpanel'}
    ],

    init: function () {
        var me = this;
        me.control({
            'categorylist': {
                selectionchange: me.onCategorySelectionChange
            },
            'foodgrid > foodcard': {
                addfood: me.onAddFood
            },
            'shoppingcartgrid': {
                submitfoodorder: me.submitFoodOrder
            },
            'orderpanel': {
                show: me.loadOrder,
                cancelfoodorder: me.cancelFoodOrder
            }
        });
    },

    loadOrder: function () {
        var store = this.getOrdersStore();
        store.load({
            callback: this.orderLoadCompleteHandler,
            scope: this
        });
    },

    orderLoadCompleteHandler: function (records, operation, success) {
        this.getOrderPanel().updateView(records);
    },

    cancelFoodOrder: function () {
        var store = this.getOrdersStore();
        store.removeAll();
        store.sync({
            success: function () {
                Ext.tmpMsg.msg('取消订单成功', false);
                this.loadOrder();
            },
            failure: function () {
                Ext.tmpMsg.msg('取消订单失败', true);
                this.loadOrder();
            },
            scope: this
        });
    },

    onLaunch: function () {
        var store = this.getUserStore();
        store.load({
            callback: this.getUserCompleteHandler,
            scope: this
        });
    },

    getUserCompleteHandler: function (records, operation, success) {
        if (success) {
            this.getAppViewPort().updateUserNameLabel(records[0]);
        }
    },

    onCategorySelectionChange: function (view, record) {
        var store = this.getFoodsStore();
        store.load({
            url: record.get("url"),
            callback: this.foodsLoadCompleteHandler,
            scope: this
        });
    },

    foodsLoadCompleteHandler: function (records, operation, success) {
        if (success) {
            this.getFoodGrid().refreshView(this.getFoodsStore());
        }
    },

    onAddFood: function (view, record) {
        var grid = this.getShoppingCartGrid();
        var store = grid.getStore();
        var index = store.find('name', record.get('name'));
        var shoppingItem;
        if (index >= 0) {
            shoppingItem = store.getAt(index);
            shoppingItem.set('count', shoppingItem.get('count') + 1);
        } else {
            shoppingItem = Ext.create('FO.model.ShoppingCartItem', {
                name: record.get('name'),
                price: record.get('price'),
                count: 1
            });
            store.add(shoppingItem);
        }
    },

    submitFoodOrder: function (grid) {
        var store = grid.getStore();
        if (store.data.length > 0) {
            var arr = [];
            for (var i = 0, len = store.data.items.length; i < len; i++) {
                arr.push(store.data.items[i].getData());
            }
            var order = Ext.create('FO.model.Order', {shoppingCartItems: arr});
            order.save({
                callback: function (records, operation, success) {
                    if (success) {
                        Ext.tmpMsg.msg('订单提交成功！', false);
                        store.removeAll();
                        var tabPanel = this.getAppViewPort().down('tabpanel');
                        tabPanel.setActiveTab(tabPanel.down('orderpanel'));
                    } else {
                        Ext.tmpMsg.msg('失败，已提交过订单！', true);
                        grid.setButtonEnable(true);
                    }
                },
                scope: this
            });
        }
    }
});