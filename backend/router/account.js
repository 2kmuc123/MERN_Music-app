const express = require('express')
const route = express.Router()

route.use(express.json())
route.use(express.urlencoded({ extended: false }));
const accountController = require('../controller/account.js')


//login
route.post('/login', accountController.login)
//register
route.post('/register', accountController.register)


module.exports = route