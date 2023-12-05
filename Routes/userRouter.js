const express = require('express')

const router = express.Router()

const jwt = require('jsonwebtoken');

const User = require('../model/userModel')

const userController = require('../Controller/userController')


const bcrypt = require('bcrypt');


router.route('/register').post(userController.register)

router.route('/login').post(userController.login)

module.exports = router 



