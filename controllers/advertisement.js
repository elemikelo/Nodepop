'use strict'

const mongoose = require('mongoose')
const Advertisement = require('../models/advertisement')
const errorHttp = require('http-errors')

function getAdvertisement (req, res, next) {
  let advertisementId = req.params.advertisementoId

  Advertisement.findById(advertisementId, (err, advertisement) => {
    if (err) return next(err)

    if (!advertisement) return next(err)

    res.send({advertisement}) // advertisement : advertisement por defecto express saca status 200
  })
}

function getAdvertisements (req, res, next) {
  const name = req.query.name
  const tags = req.query.tags
  const sales = req.query.sales
  const sort = req.query.sort
  const limit = parseInt(req.query.limit)
  const price = req.query.price
  const filter = {}

  if (tags) filter.tags = { $in: tags.split(',') }

  if (sales) filter.sales = sales

  if (name) filter.name = new RegExp('^' + req.query.name, 'i')

  if (price) {
    const priceLimits = price.split('-')

    if (priceLimits.length === 1) {
      if (priceLimits[0]) filter.price = priceLimits[0]
    }
    else {
      filter.price = {}
      if (priceLimits[0]) filter.price.$gte = priceLimits[0] // si es true buscará mayores que_
      if (priceLimits[1]) filter.price.$lte = priceLimits[1] // si no menor q
    }
  }
  Advertisement.list(filter, sort, limit, price, (err, advertisements) => {
    if (err) {
      if (err.name === 'CastError') {
        return next(new errorHttp.BadRequest(res.messages.CAST_ERROR))
      }
      return next(err)
    }

    if (!advertisements) return next(err)

    res.send({ advertisements })
  })
}

function saveAdvertisement (req, res, next) {
  let Advertisement = new Advertisement()
  advertisement.name = req.body.name
  advertisement.sales = req.body.sales
  advertisement.price = req.body.price
  advertisement.photo = req.body.photo
  advertisement.tags = req.body.tags

  advertisement.save((err, advertisementStored) => {
    if (err) next(err)

    res.send({advertisement: advertisementStored})
  })
}

function updateAdvertisement (req, res, next) {
  let advertisementId = req.params.advertisementId
  let update = req.body

  Advertisement.findByIdAndUpdate(advertisementId, update, (err, advertisementUpdate) => {
    if (err) return next(err)

    res.send({ advertisement: advertisementUpdate })
  })
}

function deleteAdvertisement (req, res, next) {
  let advertisementId = req.params.advertisementId

  Advertisement.delete(advertisementId, (err, advertisementDelete) => {
    if (err) next(err)

    res.send({ advertisement: advertisementDelete })
  })
}

module.exports = {
  getAdvertisement,
  getAdvertisements,
  saveAdvertisement,
  updateAdvertisement,
  deleteAdvertisement
}
