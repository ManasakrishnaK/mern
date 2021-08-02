const userService = require('../services/userService')

// Register a User

module.exports.createUser = async (req, res) => {
    console.log(req.body)
    let response = {};
    try {
        let resFromService = await userService.createUser(req.body);
        console.log(resFromService.tokens[0].token)
        response.status = 200,
        response.messgae = "User created SuccesFully",
        
        response.body = resFromService;
        res.cookie("jwtToken", resFromService.tokens[0].token, {httpOnly:true})
        req.user = resFromService;
        req.token  = resFromService.tokens[0].token;
    } catch (error) {
        console.log('Error at UserController: createUser', error);
        response.status = 400,
        response.messgae = error.message,
        response.body = {}
    }
    res.status(response.status).json(response.message);

}

// LogIn

module.exports.login = async (req, res) => {
    console.log(req.body)
    let response = {};
    try {
        
        let resFromService = await userService.login(req.body);
        response.status = 200,
        response.messgae = "User Logged In SuccesFully",
        response.body = resFromService;
        res.cookie("jwtToken", resFromService.tokens[resFromService.tokens.length-1].token, {httpOnly:true})
       
    } catch (error) {
        console.log('Error at UserController: login', error);
        response.status = 400,
        response.messgae = error.message,
        response.body = {}
    }
    res.status(response.status).json(response.message);

}

// logout

module.exports.logout = async (req, res) => {
    console.log('token back from request for logout',req.user)
    console.log('token back from request for logout',req.token)
    
    let response = {};
    try {
        let resFromService = await userService.logout(req.user._id, req.token);
        response.status = 200,
        response.messgae = "User Logged Out SuccesFully",
        response.body = resFromService;   
        res.clearCookie("jwtToken", {path:'/'})
    } catch (error) {
        console.log('Error at UserController: logout', error);
        response.status = 400,
        response.messgae = error.message,
        response.body = {}
    }
    res.status(response.status).json(response.message);

}




