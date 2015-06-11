Ext.define('SUM.view.OrderGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ordergrid',
    store: Ext.create('SUM.store.Orders'),
    enableColumnHide: false,
    enableColumnMove: false,
    columnLines: true,
    columns: [{
        text: '用户',
        dataIndex: 'user',
        flex: 1
    }, {
        text: '下单时间',
        dataIndex: 'time',
        flex: 1
    }, {
        text: '内容',
        dataIndex: 'items',
        flex: 1,
        renderer: function (v) {
            var html = "";
            for (var i = 0, len = v.length; i < len; i++) {
                html += '<div>' + v[i].name + ' * ' + v[i].count + "</div>";
            }
            return html;
        }
    }, {
        text: '总价',
        dataIndex: 'price',
        flex: 1,
        renderer: function (v) {
            return "￥" + v;
        }
    }]
});