const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    tokens: [{ token: { type: String, required: true } }]
})
userSchema.methods.generateAuthToken = async function () {
    try {
        console.log('this is', this);
        console.log(this._id)
        const token = await jwt.sign({_id: this._id }, process.env.SECRET_KEY)
        console.log('token available is', token)
        this.tokens = this.tokens.concat({ token: token });
        let abc = await this.save();
        console.log(abc) 
        return token;
    } catch (error) {
        console.log(error.messgae);
        throw new Error(error)
    }
}
module.exports = mongoose.model('User', userSchema)

