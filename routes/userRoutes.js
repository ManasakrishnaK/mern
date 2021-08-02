const express = require('express');
const router  = express.Router();
const userController = require('../controllers/userController')
const authValidation  = require('../middleware/authValidation')


router.post('/register', userController.createUser);

router.post('/login',  userController.login);

router.get('/logout', authValidation.authValidate, userController.logout);

module.exports = router;