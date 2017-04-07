'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')

function createToken (user) {
  return new Promise((resolve, reject) => {
    jwt.sign({ user_id: user._id }, config.SECRET_TOKEN, { expiresIn: config.expireIn },
      function (err, token) {
        if (err) reject(err)
        resolve(token)
      })
  })
}

module.exports = createToken
