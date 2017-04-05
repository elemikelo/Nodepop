'use strict'

const express = require('express')
const anuncioCtrl = require('../controllers/anuncio')
const auth = require('../middlewares/auth')

const routerAnuncio = express.Router()

routerAnuncio.get('/anuncios',  anuncioCtrl.getAnuncios)

routerAnuncio.get('/anuncios/:anuncioId', anuncioCtrl.getAnuncio)

routerAnuncio.post('/anuncios',  anuncioCtrl.saveAnuncio)

routerAnuncio.put('/anuncios/:anuncioId',  anuncioCtrl.updateAnuncio)

routerAnuncio.delete('/anuncios/:anuncioId',  anuncioCtrl.deleteAnuncio)

module.exports = routerAnuncio
