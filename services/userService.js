const bcrypt = require('bcrypt');
const User = require('../database/models/userModel')


// Register a User
module.exports.createUser = async (userDetails) => {
    const { userName, email, password, confirmPassword } = userDetails
    try {
        let userOne = await User.findOne({ email })
        if (userOne) {
            throw new Error("User already exists")
        }
        if (password !== confirmPassword) {
            throw new Error("passwords not match")
        }
        let hashPassword = await bcrypt.hash(password, 10)
        let hashConfirmPassword = await bcrypt.hash(confirmPassword, 10);
        let user = new User({ userName: userName, email: email, password: hashPassword, confirmPassword: hashConfirmPassword });
        console.log(user)
        const token = await user.generateAuthToken();
        console.log('token is', token);
        let result = await user.save();
        return result;

    } catch (error) {
        console.log('Error at UserService : createUser', error);
        throw new Error(error)
    }
}

// login

module.exports.login = async (loginDetails) => {
    const { email, password } = loginDetails
    try {
        let user = await User.findOne({email})
        console.log(user.password)
        if (!user) {
            throw new Error("User not found")
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            throw new Error("passwords don't match")
        }
        const token = user.generateAuthToken();
        console.log('token part at login is', token);
        console.log('user at login service', user)
        return user;

    } catch (error) {
        console.log('Error at UserService : login', error);
        throw new Error(error)
    }
}

// logout

module.exports.logout = async (id, requestedtoken) => {
    console.log('id at', id)
    console.log('token at', requestedtoken)
    try {
        
        const user = await User.findOne({_id:id})
        console.log('user',user)
        user.tokens  = user.tokens.filter((value)=>value.token !== requestedtoken)
        await user.save()
        return user;
    } catch (error) {
        console.log('Error at UserService : logout', error);
        throw new Error(error)
    }
}