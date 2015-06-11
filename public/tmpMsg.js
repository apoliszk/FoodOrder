Ext.tmpMsg = function () {
    var msgCt;

    function createBox(t, isErr) {
        if (isErr) {
            return '<div class="msgErr ' + Ext.baseCSSPrefix + 'border-box">' + t + '</div>';
        } else {
            return '<div class="msg ' + Ext.baseCSSPrefix + 'border-box">' + t + '</div>';
        }
    }

    return {
        msg: function (t, isErr) {
            var m = Ext.DomHelper.overwrite(msgCt, createBox(t, isErr), true);
            m.show(true).ghost("t", {delay: 500, remove: true});
        },

        init: function () {
            if (!msgCt) {
                msgCt = Ext.DomHelper.insertFirst(document.body, {id: 'msg-div'}, true);
            }
        }
    };
}();

Ext.onReady(Ext.tmpMsg.init, Ext.tmpMsg);
