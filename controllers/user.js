'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const createToken = require('../services/token.js')

function register (req, res, next) {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  user.save((err) => {
    if (err) return next(err)

    createToken(user).then(token => {
      res.json({ success: true, token })

    }).catch(function (err) {
      res.json({ success: false, message: err })
    })
  })
}

function login (req, res, next) {
  const email = req.body.email
  const password = req.body.password

  User.findOne({email}).exec((err, user) => {
    if (err) return next(err)

    if (!user) return res.json({succes: false, error: 'User does not exist'})

    // test a matching password
    user.comparePassword(password, function (err, isMatch) {
      if (err) return console.log('Error', err)
      if (!isMatch) return res.status(401).send({success: false, message: 'Password Invalid'})

      // Authorization == true , create token
      createToken(user).then(token => {
        return res.json({ success: true, token })

      }).catch(function (err) {
        res.json({ success: false, message: err })
      })
    })
  })
}

module.exports = {
  register,
  login
}
