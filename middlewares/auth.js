'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')

function isAuth (req, res, next) {
  const token = req.query.token || req.get('x-access-token') || req.body.token

  if (!token) return res.status(403).send({ success: false, message: 'No token provided' })

  jwt.verify(token, config.SECRET_TOKEN, (err, decoded) => {
    if (err) return next(new Error('Invalid Token'))
    next()
  })
}

module.exports = {isAuth}
