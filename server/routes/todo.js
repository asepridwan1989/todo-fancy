const router = require('express').Router()
const {getList, addTask, editTask, searchTask, deleteTask, showComplete, showUncomplete} = require('../controllers/todo.controller')
const {auth} = require('../middleware/auth')
router
    .post('/', auth, addTask)
    .get('/', auth, getList)
    .put('/', auth, editTask)
    .delete('/:id', auth, deleteTask)
    .get('/search', auth, searchTask)
    .get('/complete', auth, showComplete)
    .get('/uncomplete', auth, showUncomplete)

module.exports = router