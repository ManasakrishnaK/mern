const Product = require('../database/models/productModel');
console.log(Product);
const mongoose = require('mongoose')

/* const product1 = new Product({
    name: 'Trousers',
    brand: 'Jockey',
    color: 'blue',
    price: 200,
    Details: 'this is a trouser with blue color'
})

const product2 = new Product({
    name: 'Shirts',
    brand: 'US Polo',
    color: 'red',
    price: 500,
    Details: 'this is a shirt with red color'
})

const product3 = new Product({
    name: 'Socks',
    brand: 'No brand',
    color: 'Grey',
    price: 300,
    Details: 'these are socks with a grey color'
})

console.log(`product1 is ${product1}`)
console.log(`product2 is ${product2}`)
console.log(`product3 is ${product3}`)

module.exports.createProducts = async () => {
    try {
        const products = await Product.insertMany([product1, product2, product3])
        console.log(products)
    } catch (error) {
        console.log('error at inserting data into database')
    }
}

 */

// create single product

module.exports.createProduct = async (details) => {
    try {
        let product = new Product({ ...details })
        console.log(product)
        let result = await product.save();
        return result.toObject();
    }
    catch (error) {
        console.log('error at product Service : create Product')
        throw new Error(error)
    }
}

// get All Products

module.exports.getAllProducts = async () => {
    try {
        let result = Product.find({})
        console.log(result)
        return result
    } catch (error) {
        console.log('error at product Service : getAllProducts')
        throw new Error(error)
    }
}

// Get product BY Id

module.exports.getProductById = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Not Valid Id")
        }
        let result = Product.findById({ _id: id })
        console.log(result)
        return result;
    } catch (error) {
        console.log('error at product Service : getProductById')
        throw new Error(error)
    }
}


// Update product

module.exports.updateProduct = async (id, data) => {
    console.log(id)
    console.log(data)
    try {
        let result = Product.findOneAndUpdate({ _id: id }, { $set: { ...data } }, { new: true })
        console.log(result)
        return result;
    } catch (error) {
        console.log('error at product Service : updateProduct')
        throw new Error(error)
    }
}

// delete Product

module.exports.deleteProduct = async (id) => {
    console.log(id)
    try {
        let result = Product.findOneAndDelete({ _id: id })
        console.log(result)
        return result;
    } catch (error) {
        console.log('error at product Service : deleteProduct')
        throw new Error(error)
    }
}





