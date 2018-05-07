const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const validate = require('../helper/check-combine')

module.exports = {
    getUser: (req, res)=>{
        User.find()
            .then(user=>{
                res.status(200).json({
                    message: 'successfuly got data',
                    data: user
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'failed to get user'
                })
            })
    },

    signUp: (req, res)=>{
        let email = req.body.email
        let password = req.body.password
        let valPass = validate(password)

        if(password.length < 8){
            res.status(400).json({
                message:'password minimum 8 chars is required'
            })
        }else{
            if(!valPass){
                res.status(400).json({
                    message:'combine alphabet and number is required'
                })
            }else{
                bcrypt.hash(password,10,function(err,hash){
                    if(err){
                        res.status(500).jason({
                            message:err
                        })
                    }else{
                        password = hash
                        let user = new User({
                            email,password
                        })
                        user.save((err,result)=>{
                            if(err){
                                res.status(400).json({
                                    message:'sign up was failed',
                                    error: err.errmsg
                                })
                            }else{
                                res.status(201).json({
                                    message: 'user was successfuly signed up',
                                    data:result
                                })
                            }
                        })
                    }
                })
            }
        }
    },

    createUser: (req, res)=>{
        let email = req.body.email
        let password = req.body.password
        let role = req.body.role
        let valPass = validate(password)

        if(password.length < 8){
            res.status(400).json({
                message:'password minimum 8 chars is required'
            })
        }else{
            if(!valPass){
                res.status(400).json({
                    message:'combine alphabet and number is required'
                })
            }else{
                bcrypt.hash(password,10,function(err,hash){
                    if(err){
                        res.status(500).jason({
                            message:err
                        })
                    }else{
                        password = hash
                        let user = new User({
                            email, password, role
                        })
                        user.save((err,result)=>{
                            if(err){
                                res.status(400).json({
                                    message:'sign up was failed',
                                    error: err.errmsg
                                })
                            }else{
                                res.status(201).json({
                                    message: 'user was successfuly signed up',
                                    data:result
                                })
                            }
                        })
                    }
                })
            }
        }
    },

    signIn: (req, res)=>{
        let email = req.body.email
        let password = req.body.password
        
        User.findOne({
            email
        },(err, dataUser)=>{
            if(err){
                res.status(400).json({
                    message:err
                })
            }else{
                if(!dataUser){
                    res.status(400).json({
                        message : 'email is not registered'
                    })
                }else{
                    let verify = bcrypt.compareSync(password, dataUser.password)
                    if(!verify){
                        res.status(400).json({
                            message: "password is not match"
                        })
                    }else{
                        let token = jwt.sign({
                            id: dataUser._id,
                            email: dataUser.email
                        }, process.env.TOKENKEY)
                        res.status(200).json({
                            message: 'successfuly logged in',
                            token:token,
                            dataUser:dataUser
                        })
                    }
                }
            }
        })
    },

    deleteUser: (req, res)=>{
        const id = mongoose.Types.ObjectId(req.params.id)

        User.findById(id, (err, user) => {
            if(err) {
                res.status(404).send({
                    message: err
                })
            } else {
                User.remove({
                    _id: id
                }, (err) => {
                    if(err) {
                        res.status(400).send({
                            message: 'failed to delete user'
                        })
                    } else {
                        res.status(200).send({
                            message: 'user was successfuly deleted',
                            data: user
                        })
                    }
                })
            }
        })
    }
}