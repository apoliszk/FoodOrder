Ext.define('SUM.controller.SummaryController', {
    extend: 'Ext.app.Controller',
    refs: [
        {ref: 'summaryGrid', selector: 'summarygrid'},
        {ref: 'orderGrid', selector: 'ordergrid'}
    ],

    init: function () {
        var me = this;
        me.control({
            'summarygrid': {
                showdetail: me.showSummaryDetail,
                scope: me
            },
            'ordergrid': {
                cancelfoodorder: me.cancelOrder,
                scope: me
            }
        });
    },

    showSummaryDetail: function (record) {
        var obj = record.data;
        var grid = Ext.create('widget.grid', {
            border: false,
            enableColumnHide: false,
            enableColumnMove: false,
            columnLines: true,
            columns: [{
                text: '用户',
                dataIndex: 'user',
                flex: 1
            }, {
                text: '数量',
                dataIndex: 'count',
                flex: 1
            }],
            store: Ext.create('SUM.store.SummaryGridItemDetails')
        });
        grid.getStore().add(obj.userList);
        Ext.create('Ext.window.Window', {
            title: obj.name + '（单价：￥' + obj.price + '）',
            width: 400,
            height: 400,
            modal: true,
            layout: 'fit',
            items: [grid]
        }).show();
    },

    cancelOrder: function (rowIndex) {
        var me = this;

        Ext.Msg.show({
            title: '提示',
            msg: '确定取消该订单吗？',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.WARNING,
            fn: function (btn) {
                if (btn === 'ok') {
                    var mask = new Ext.LoadMask({
                        msg: '订单取消中...',
                        target: Ext.getBody()
                    });
                    mask.show();

                    var store = me.getOrderGrid().getStore();
                    store.removeAt(rowIndex);
                    store.sync({
                        success: function () {
                            mask.hide();
                            Ext.tmpMsg.msg('取消订单成功', false);
                            me.loadOrder();
                        },
                        failure: function () {
                            mask.hide();
                            Ext.tmpMsg.msg('取消订单失败', true);
                            me.loadOrder();
                        }
                    });
                }
            }
        });
    },

    onLaunch: function () {
        this.loadOrder();
    },

    loadOrder: function () {
        var store = this.getOrderGrid().getStore();
        store.load({
            callback: this.getOrdersCompleteHandler,
            scope: this
        });
    },

    getOrdersCompleteHandler: function (records, operation, success) {
        if (success) {
            var foodDic = {};
            for (var i = 0; i < records.length; i++) {
                var obj = records[i].data;
                for (var j = 0; j < obj.items.length; j++) {
                    var item = obj.items[j];
                    var countObj = foodDic[item.name];
                    if (!countObj) {
                        countObj = {
                            name: item.name,
                            price: item.price,
                            count: 0,
                            userList: []
                        };
                        foodDic[item.name] = countObj;
                    }
                    countObj.count += item.count;
                    countObj.userList.push({user: obj.user, count: item.count});
                }
            }
            var arr = [];
            for (var food in foodDic) {
                arr.push(foodDic[food]);
            }
            var summaryGridStore = this.getSummaryGrid().getStore();
            summaryGridStore.removeAll();
            summaryGridStore.add(arr);
        }
    }
});