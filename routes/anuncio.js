'use strict'

const express = require('express')
const anuncioCtrl = require('../controllers/anuncio')
const authCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/anuncios', auth.isAuth, anuncioCtrl.getAnuncios)

router.get('/anuncios/:anuncioId', auth.isAuth, anuncioCtrl.getAnuncio)

router.post('/anuncios', auth.isAuth, anuncioCtrl.saveAnuncio)

router.put('/anuncios/:anuncioId', auth.isAuth, anuncioCtrl.updateAnuncio)

router.delete('/anuncios/:anuncioId', auth.isAuth, anuncioCtrl.deleteAnuncio)

// User

router.post('/register', authCtrl.register)

router.post('/login', authCtrl.login)

module.exports = router
