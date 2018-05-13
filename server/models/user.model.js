const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
var uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'You have to insert your email address'],
        validate: {
            validator: function(email) {
                return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email);
            },
            message: 'Email is not valid'
        },
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Password required'],
        minlength: [8, 'Password must contains min 8 char'],
        validate: {
          validator : function(password){
            let alphabeth = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
            let num = '0123456789'
            let checker = password.split('')
            let counterAlpha = 0
            let counterNum = 0

            checker.forEach(check =>{
                if( alphabeth.indexOf(check)!= -1){
                    counterAlpha ++
                }else{
                    if( num.indexOf(check)!= -1){
                    counterNum ++
                    }
                }
            })

            return(counterAlpha != 0 && counterNum != 0)
          },
          message: 'combine alphabet and number is required'
        }
    },
    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true
})

userSchema.plugin(uniqueValidator, { message: 'Email is already used'});

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password,10,function(err,hash){
    if(err){
      return err
    }else{
      this.password = hash
      next()
    }
  })

});



let user = mongoose.model('user', userSchema)

module.exports = user
