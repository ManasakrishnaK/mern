const express = require('express');
const router  = express.Router();
const productController = require('../controllers/productController')
const authValidation  = require('../middleware/authValidation')

router.post('/', productController.createProduct)

router.get('/', authValidation.authValidate, productController.getAllProducts)

router.get('/:id', productController.getProductById);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct)

console.log(router)

module.exports = router