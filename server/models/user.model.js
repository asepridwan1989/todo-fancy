const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'You have to insert you email address'],
        unique: [true, 'Email address is already exits'],
        validate: {
            validator: function(email) {
                return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email);
            },
            message: 'Email is not valid'
        } 
    },
    password: {
        type: String,
        require: [true, 'Password required'],
        minlength: [8, 'Password must contains min 6 char']
    },
    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true
})

let user = mongoose.model('user', userSchema)

module.exports = user


