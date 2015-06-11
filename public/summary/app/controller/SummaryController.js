Ext.define('SUM.controller.SummaryController', {
    extend: 'Ext.app.Controller',
    stores: ['Orders'],
    refs: [
        {ref: 'summaryGrid', selector: 'summarygrid'},
    ],

    init: function () {
        var me = this;
        me.control({
            'summarygrid': {
                showDetail: me.showSummaryDetail
            }
        });
    },

    showSummaryDetail: function (record) {
        var obj = record.data;
        debugger;
        var grid = Ext.create('widget.grid', {
            border: false,
            enableColumnHide: false,
            enableColumnMove: false,
            columns: [{
                text: '用户',
                dataIndex: 'user'
            }, {
                text: '数量',
                dataIndex: 'count'
            }],
            store: Ext.create('Ext.data.ArrayStore', {})
        });
        //grid.getStore().add(obj.userList);
        Ext.create('Ext.window.Window', {
            title: obj.name + '（￥' + obj.price + '）',
            width: 400,
            height: 400,
            modal: true,
            layout: 'fit',
            items: [grid]
        }).show();
    },

    onLaunch: function () {
        var store = this.getOrdersStore();
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
                    countObj.userList.push({user: obj.userIp, count: item.count});
                }
            }
            var arr = [];
            for (var food in foodDic) {
                arr.push(foodDic[food]);
            }
            var summaryGridStore = this.getSummaryGrid().getStore();
            summaryGridStore.add(arr);
        }
    }
});