'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const mongoErrors = require('mongo-errors')
const createToken = require('../services/token.js')
const errorHttp = require('http-errors')

function register (req, res, next) {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  user.save((err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === mongoErrors.DuplicateKey) {
        return next(new errorHttp.Conflict(res.messages.EMAIL_ALREADY_EXISTS))
      }
      if (err.name === 'ValidationError') {
        return next(new errorHttp.UnprocessableEntity(res.messages.INVALID_DATA))
      }
    }

    createToken(user).then(token => {
      res.json({ success: true, token })

    }).catch((err) => {
      res.json({ success: false, message: err })
    })
  })
}

function login (req, res, next) {
  const email = req.body.email
  const password = req.body.password

  User.findOne({email}).exec((err, user) => {
    if (err) return next(err)

    if (!user) return new errorHttp.Unauthorized(res.messages.INVALID_CREDENTIALS)

    // test a matching password
    user.comparePassword(password, (err, isMatch) => {
      if (err) return next(err)
      if (!isMatch) return new errorHttp.Unauthorized(res.messages.INVALID_CREDENTIALS)

      // Authorization == true , create token
      createToken(user).then(token => {
        return res.json({ success: true, token })

      }).catch((err) => {
        return next(err)
      })
    })
  })
}

module.exports = {
  register,
  login
}
