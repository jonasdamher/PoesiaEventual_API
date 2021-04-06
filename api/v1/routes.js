'use strict';

const router = require('express').Router()
const auth = require('./middlewares/auth')

// CONTROLLERS
const userController = require('./controllers/user-controller')
const authorController = require('./controllers/author-controller')
const poemController = require('./controllers/poem-controller')

// ROUTES
// USER
router.post('/auth/login', userController.login)
router.post('/auth/signup', userController.signup)
router.post('/auth/refresh-token', auth.authAdmin, userController.refreshToken)
router.patch('/user/:id', auth.authAdmin, userController.update)

//AUTHOR
router.get('/author/get/:id', authorController.getAuthorWithId)
router.get('/author/search/:search', authorController.getSearchAuthor)
router.get('/author/poems/:id', authorController.getPoemsList)

router.post('/author/create', auth.authAdmin, authorController.createAuthor)
router.patch('/author/update/:id', auth.authAdmin, authorController.update)

//POEM
router.get('/poem/get/:id', poemController.getPoemWithId)
router.post('/poem/create', auth.authAdmin, poemController.createPoem)
router.patch('/poem/update/:id', auth.authAdmin, poemController.update)

module.exports = router