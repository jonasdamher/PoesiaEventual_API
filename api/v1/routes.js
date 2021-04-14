'use strict';

const router = require('express').Router()
const auth = require('./middlewares/auth')
 
// CONTROLLERS
const user = require('./controllers/user-controller')
const author = require('./controllers/author-controller')
const poem = require('./controllers/poem-controller')

// ROUTES
// USER
router.post('/auth/login', user.login)
router.post('/auth/signup', user.signup)

router.post('/auth/refresh-token', auth.authAdmin, user.refreshToken)
router.patch('/user/:id', auth.authAdmin, user.update)

//AUTHOR
router.get('/author/get/:id', author.getWithId)
router.get('/author/search/:search', author.searchAuthor)
router.get('/author/random', author.random)
router.get('/author/poems/:id', author.getPoemsList)

router.post('/author/create', auth.authAdmin, author.create)
router.patch('/author/update/:id', auth.authAdmin, author.update)

//POEM
router.get('/poem/get/:id', poem.getWithId)
router.get('/poem/search/:search', poem.searchPoem)
router.get('/poem/random', poem.random)

router.post('/poem/create', auth.authAdmin, poem.create)
router.patch('/poem/update/:id', auth.authAdmin, poem.update)

module.exports = router