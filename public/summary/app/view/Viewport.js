Ext.define('SUM.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.appviewport',
    requires: ['SUM.view.SummaryGrid'],
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'summarygrid',
        margin: '10 5 10 10',
        title: '汇总',
        flex: 1
    }, {
        title: '列表',
        margin: '10 10 40 5',
        flex: 1
    }]
});