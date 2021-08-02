const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
var cookieParser = require('cookie-parser')
const app = express();
dotenv.config();

const dbConnection = require('./database/connection');
dbConnection()

/* const createProduct = require('./services/productService')
console.log(createProduct()) */
app.use(cors({origin:'http://localhost:3000', credentials: true, methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE', allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization']}));

app.use(express.json());
app.use(cookieParser())

/* const productService = require('./services/productService')
productService.createProducts()
console.log(productService.createProducts()) */

app.use('/api/v1/product', require('./routes/productRoutes'))

app.use('/api/v1/user', require('./routes/userRoutes'))

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Server is listening to the ${port}`))