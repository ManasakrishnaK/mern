const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors')
const app = express();
dotenv.config();

const dbConnection = require('./database/connection');
dbConnection()
/* const createProduct = require('./services/productService')
console.log(createProduct()) */
app.use(cors({origin:'http://localhost:3000'}))
app.use(express.json())
/* const productService = require('./services/productService')
productService.createProducts()
console.log(productService.createProducts()) */

app.use('/api/v1/product', require('./routes/productRoutes'))

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Server is listening to the ${port}`))