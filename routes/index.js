'use strict'

const express = require('express')
const anuncioCtrl = require('../controllers/anuncio')
const api = express.Router()

api.get('/anuncios', anuncioCtrl.getAnuncios)

api.get('/anuncios/:anuncioId', anuncioCtrl.getAnuncio)

api.post('/anuncios', anuncioCtrl.saveAnuncio)

api.put('/anuncios/:anuncioId', anuncioCtrl.updateAnuncio)

api.delete('/anuncios/:anuncioId', anuncioCtrl.deleteAnuncio)

module.exports = api
