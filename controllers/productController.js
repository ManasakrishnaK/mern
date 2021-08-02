const productService = require('../services/productService')

// create Product

module.exports.createProduct = async (req, res) => {
    console.log(req.body)
    let response = {}
    try {
        let resFromService = await productService.createProduct(req.body)
        response.status = 200;
        response.message = "Product Created Successfully"
        response.body = resFromService
    } catch (error) {
        console.log('error at productService : createProduct')
        response.status = 400;
        response.message = error.messsage
        response.body = resFromService
    }
    res.status(response.status).send(response)
}


// Get All Products

module.exports.getAllProducts = async (req, res) => {
    console.log(req.body)
    let response = {}
    try {
        let resFromService = await productService.getAllProducts();
        response.status = 200;
        response.message = "Product fetched Successfully"
        response.body = resFromService
    } catch (error) {
        console.log('error at productService : getAllProducts')
        response.status = 400;
        response.message = error.messsage
        response.body = {}
    }
    res.status(response.status).send(response)
}

// get product By Id

module.exports.getProductById = async (req, res) => {
    console.log(req.params)
    let response = {}
    try {
        let resFromService = await productService.getProductById(req.params.id)
        response.status = 200;
        response.message = "Single Product fetched Successfully"
        response.body = resFromService
    } catch (error) {
        console.log('error at productService : getProductById')
        response.status = 400;
        response.message = error.messsage
        response.body = {}
    }
    res.status(response.status).send(response)
}

// Update Product

module.exports.updateProduct = async (req, res) => {
    console.log(req.params)
    let response = {}
    try {
        let resFromService = await productService.updateProduct(req.params.id, req.body)
        response.status = 200;
        response.message = "Updated SuccessFully"
        response.body = resFromService
    } catch (error) {
        console.log('error at productService : updateProduct')
        response.status = 400;
        response.message = error.messsage
        response.body = {}
    }
    res.status(response.status).send(response)
}

// delete Product

module.exports.deleteProduct = async (req, res) => {
    console.log(req.params)
    let response = {}
    try {
        let resFromService = await productService.deleteProduct(req.params.id)
        response.status = 200;
        response.message = "Deleted SuccessFully"
        response.body = resFromService
    } catch (error) {
        console.log('error at productService : deleteProduct')
        response.status = 400;
        response.message = error.messsage
        response.body = {}
    }
    res.status(response.status).send(response)
}



