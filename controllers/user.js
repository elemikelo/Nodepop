'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')
const service = require('../services')

function register (req, res) {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  user.save((err, next) => {
    if (err) return res.status(500).send({message: `Error al crear el usuario: ${err}`})

    return res.status(200).send({ token: service.createToken(user) })
  })
}

function login (req, res) {
  User.findOne({email: req.body.email}, function (err, user) {
    if (err) return res.status(500).send({success: false, message: `Error al autenticar al usuario: ${err}`})
    if (!user) return res.status(404).send({success: false, message: 'Este usuario no existe'})

    User.comparePassword(req.body.password, function (err, res) {
      if (err) return res.status(500).send({success: false, message: `Error al crear el usuario: ${err}`})

      return res.status(200).send({success: true, token: service.createToken(user)})
    })
  })
}

module.exports = {
  register,
  login
}
