'use strict'

const express = require('express')
const anuncioCtrl = require('../controllers/anuncio')
const api = express.Router()
const auth = require('../middlewares/auth')

api.get('/anuncios', anuncioCtrl.getAnuncios)

api.get('/anuncios/:anuncioId', anuncioCtrl.getAnuncio)

api.post('/anuncios', anuncioCtrl.saveAnuncio)

api.put('/anuncios/:anuncioId', anuncioCtrl.updateAnuncio)

api.delete('/anuncios/:anuncioId', anuncioCtrl.deleteAnuncio)

api.get('/private', auth.isAuth, function (req, res) {
  res.status(200).send({message: 'Tienes acceso'})
})

module.exports = api
