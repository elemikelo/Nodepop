'use strict'

const express = require('express')
const anuncioCtrl = require('../controllers/anuncio')
const auth = require('../middlewares/auth')

const routerAnuncio = express.Router()

routerAnuncio.get('/anuncios', auth.isAuth, anuncioCtrl.getAnuncios)

routerAnuncio.get('/anuncios/:anuncioId', anuncioCtrl.getAnuncio)

routerAnuncio.post('/anuncios', auth.isAuth, anuncioCtrl.saveAnuncio)

routerAnuncio.put('/anuncios/:anuncioId', auth.isAuth, anuncioCtrl.updateAnuncio)

routerAnuncio.delete('/anuncios/:anuncioId', auth.isAuth, anuncioCtrl.deleteAnuncio)

module.exports = routerAnuncio
