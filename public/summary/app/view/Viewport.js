Ext.define('SUM.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.appviewport',
    requires: ['SUM.view.SummaryGrid', 'SUM.view.OrderGrid'],
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
        title: '列表',
        xtype: 'ordergrid',
        margin: '10 5 40 10',
        flex: 1
    }, {
        title: '汇总',
        xtype: 'summarygrid',
        margin: '10 10 10 5',
        flex: 1
    }]
});