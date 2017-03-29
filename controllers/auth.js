'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function register (req, res) {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  user.save((err) => {
    if (err) res.status(500).send({message: `Error al crear el usuario: ${err}`})

    return res.status(200).send({ token: service.createToken(user) })
  })
}

function login (req, res) {
  User.findOne({email: req.body.email}, function (err, user) {
    if (err) res.status(500).send({message: `Error al autenticar al usuario: ${err}`})
    if (!user) res.status(404).send({message: 'Este usuario no existe'})
    // falta Si la contraseña es correcta

    return res.status(200).send({token: service.createToken(user)})
  })
}

module.exports = {
  register,
  login
}
