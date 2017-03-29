'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken (user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(), // Momento que se crea el token
    exp: moment().add(14, 'days').unix() // Tiempo que caduca
  }
  return jwt.encode(payload, config.SECRET_TOKEN)
}

module.exports = {createToken}
