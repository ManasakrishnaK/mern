const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    color: String,
    price: Number,
    Details: String
}, {
    toObject: {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v
            return ret
        }
    }
})


const Product = mongoose.model('Product', productSchema)
module.exports = Product
// console.log(`model is ${Product}`)