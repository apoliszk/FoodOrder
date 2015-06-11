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
                showDetail: me.showSummaryDetail
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

    onLaunch: function () {
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
            summaryGridStore.add(arr);
        }
    }
});