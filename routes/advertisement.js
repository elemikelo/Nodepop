'use strict'

const express = require('express')
const advertisementCtrl = require('../controllers/advertisement')
const auth = require('../middlewares/auth')

const routerAdvertisement = express.Router()

routerAdvertisement.get('/advertisements', advertisementCtrl.getAdvertisements) // auth.isAuth

routerAdvertisement.get('/advertisements/:advertisementId', advertisementCtrl.getAdvertisement)

routerAdvertisement.post('/advertisements', auth.isAuth, advertisementCtrl.saveAdvertisement)

routerAdvertisement.put('/advertisements/:advertisementId', auth.isAuth, advertisementCtrl.updateAdvertisement)

routerAdvertisement.delete('/advertisements/:advertisementId', auth.isAuth, advertisementCtrl.deleteAdvertisement)

module.exports = routerAdvertisement
