var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/FoodOrder");
var db = mongoose.connection;
db.on('error', function () {
    console.log('connect to db failed');
    db.close();
});

db.once('open', function () {
    var express = require('express');
    var favicon = require('serve-favicon');
    var bodyParser = require('body-parser');
    var model = require('./model');

    model.init(mongoose);

    var app = express();

    app.use(express.static(__dirname + '/public'));
    app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(bodyParser.json());

    app.get('/order/user', function (req, res) {
        var result = {ip: getRequestIp(req)};
        res.end(JSON.stringify(result));
    });

    app.post('/order/order', function (req, res) {
        var dateObj = getStartEndDate();
        var userIp = getRequestIp(req);

        var model = global.models.Order;

        var deleteOrder = req.body;
        if (deleteOrder.orderId) {
            model.remove({_id: mongoose.Types.ObjectId(deleteOrder.orderId)}, function (err) {
                var result = {success: true};
                if (err) {
                    result.success = false;
                }
                res.end(JSON.stringify(result));
            });
        } else {
            model.find({
                userIp: userIp,
                time: {$gte: dateObj.start, $lt: dateObj.end}
            }, function (err, doc) {
                var result = {success: true};
                if (doc.length > 0) {
                    result.success = false;
                    res.end(JSON.stringify(result));
                } else {
                    var orderObj = req.body;
                    orderObj.time = dateObj.now;
                    orderObj.userIp = userIp;

                    model.create(orderObj, function (e, order) {
                        if (e) {
                            result.success = false;
                            console.error(e);
                        }
                        res.end(JSON.stringify(result));
                    });
                }
            });
        }
    });

    app.get('/order/order', function (req, res) {
        var dateObj = getStartEndDate();
        var userIp = getRequestIp(req);

        var model = global.models.Order;
        model.find({
            userIp: userIp,
            time: {$gte: dateObj.start, $lt: dateObj.end}
        }, function (err, doc) {
            if (err) {
                res.end(JSON.stringify({success: false}));
            } else {
                if (doc.length > 0) {
                    var orderModel = doc[0];
                    var orderObj = {};
                    orderObj.orderId = orderModel.id.toString();
                    orderObj.time = formatDate(orderModel.time);
                    orderObj.shoppingCartItems = orderModel.shoppingCartItems;
                    var totalPrice = 0;
                    for (var i = orderObj.shoppingCartItems.length - 1; i >= 0; i--) {
                        var item = orderObj.shoppingCartItems[i];
                        totalPrice += item.price * item.count;
                    }
                    orderObj.totalPrice = totalPrice;
                    res.end(JSON.stringify(orderObj));
                } else {
                    res.end(JSON.stringify({success: false}));
                }
            }
        });
    });

    app.get('/orderAll', function (req, res) {
        var dateObj = getStartEndDate();

        var model = global.models.Order;
        model.find({
            time: {$gte: dateObj.start, $lt: dateObj.end}
        }, function (err, doc) {
            if (err) {
                res.end(JSON.stringify({success: false}));
            } else {
                var len = doc.length;
                var retArr = [];
                for (var i = 0; i < len; i++) {
                    var orderModel = doc[i];
                    var orderObj = {};
                    orderObj.userIp = orderModel.userIp;
                    orderObj.time = formatDate(orderModel.time);
                    orderObj.shoppingCartItems = orderModel.shoppingCartItems;
                    var totalPrice = 0;
                    for (var j = orderObj.shoppingCartItems.length - 1; j >= 0; j--) {
                        var item = orderObj.shoppingCartItems[j];
                        totalPrice += item.price * item.count;
                    }
                    orderObj.totalPrice = totalPrice;
                    retArr.push(orderObj)
                }
                res.end(JSON.stringify(retArr));
            }
        });
    });

    var server = app.listen(8888, function () {
        console.log('Listening on port %d', server.address().port);
    });

    function getRequestIp(req) {
        var ip = req.ip;
        if (ip.indexOf(':') >= 0) {
            ip = ip.substring(ip.lastIndexOf(':') + 1);
        }
        return ip;
    }

    function getStartEndDate() {
        var now = new Date();
        var start;
        var end;
        if (now.getHours() < 12) {
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0);
            end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
        } else {
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
            end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0);
        }

        return {
            start: start,
            end: end,
            now: now
        };
    }

    function formatDate(date) {
        return date.getFullYear()
            + "-" + formatNum(date.getMonth() + 1)
            + "-" + formatNum(date.getDate())
            + " " + formatNum(date.getHours())
            + ":" + formatNum(date.getMinutes())
            + ":" + formatNum(date.getSeconds());
    }

    function formatNum(num) {
        if (num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }
});
