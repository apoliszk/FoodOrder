function init(mongoose) {
    var shoppingCartItemSchema = mongoose.Schema({
        name: String,
        price: Number,
        count: Number
    }, {_id: false});
    var ShoppingCartItem = mongoose.model('ShoppingCartItem', shoppingCartItemSchema);

    var orderSchema = mongoose.Schema({
        time: Date,
        userIp: String,
        shoppingCartItems: [shoppingCartItemSchema]
    });
    var Order = mongoose.model('Order', orderSchema);

    global.models = {};
    global.models.Order = Order;
    global.models.ShoppingCartItem = ShoppingCartItem;
}

exports.init = init;