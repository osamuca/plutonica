'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

<<<<<<< HEAD
=======
// exportando
// exports.get = () => {
//     return Product
//         .find({
//             active: true
//         }, 'title price slug');
// }
>>>>>>> bf8fee4e4b6f0e3dc9f1ea761098a1213f85dbc8
exports.get = async() => {
    const res = await Product.find({
        active: true
    }, 'title price slug');
    return res;
}

exports.getBySlug = async(slug) => {
    const res = await Product
        .findOne({
            slug: slug,
            active: true
        }, 'title description price slug tags');
    return res;
}

exports.getById = async(id) => {
    const res = await Product
        .findById(id);
    return res;
}

exports.getByTag = async(tag) => {
    const res = Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags');
    return res;
}

<<<<<<< HEAD
=======
// pode ser assim tbm => // exports.create = async(body) => {
>>>>>>> bf8fee4e4b6f0e3dc9f1ea761098a1213f85dbc8
exports.create = async(data) => {
    var product = new Product(data);
    await product.save();
}

exports.update = async(id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        });
}

exports.delete = async(id) => {
    await Product
        .findOneAndRemove(id);
}