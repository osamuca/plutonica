<<<<<<< HEAD
'use strict';
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async(data) => {
    var res = await Order
        .find({}, 'number status customer items')
        .populate('customer', 'name')
        .populate('items.product', 'title');
    return res;
}

exports.create = async(data) => {
    var order = new Order(data);
    await order.save();
}
=======
// 'use strict';
// const mongoose = require('mongoose');
// const Order = mongoose.model('Order');

// exports.get = async(data) => {
//     var res = await Order
//         .find({}, 'number status customer items')
//         .populate('customer', 'name')
//         .populate('items.product', 'title');
//     return res;
// }

// exports.create = async(data) => {
//     var order = new Order(data);
//     await order.save();
// }
>>>>>>> bf8fee4e4b6f0e3dc9f1ea761098a1213f85dbc8
