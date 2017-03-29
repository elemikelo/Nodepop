'use strict'

const express = require('express')
const anuncioCtrl = require('../controllers/anuncio')
const authCtrl = require('../controllers/auth')

const api = express.Router()
const auth = require('../middlewares/auth')

api.get('/anuncios', anuncioCtrl.getAnuncios)

api.get('/anuncios/:anuncioId', anuncioCtrl.getAnuncio)

api.post('/anuncios', anuncioCtrl.saveAnuncio)

api.put('/anuncios/:anuncioId', anuncioCtrl.updateAnuncio)

api.delete('/anuncios/:anuncioId', anuncioCtrl.deleteAnuncio)

api.post('/create', authCtrl.register)

module.exports = api
