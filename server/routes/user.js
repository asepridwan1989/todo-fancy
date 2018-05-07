const router = require('express').Router()
const {signUp, signIn, createUser, deleteUser, getUser} = require('../controllers/user.controller')
const {isAdmin} = require('../middleware/auth')

router
    .get('/', isAdmin, getUser)
    .post('/signup', signUp)
    .post('/signin', signIn)
    .post('/create', isAdmin, createUser )
    .delete('/:id', isAdmin, deleteUser)

module.exports = router