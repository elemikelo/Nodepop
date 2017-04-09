'use strict'

const mongoose = require('mongoose')
const Anuncio = require('../models/anuncio')
const errorHttp = require('http-errors')

function getAnuncio (req, res, next) {
  let anuncioId = req.params.anuncioId

  Anuncio.findById(anuncioId, (err, anuncio) => {
    if (err) return next(err)

    if (!anuncio) return next(err)

    res.send({anuncio}) // anuncio : anuncio por defecto express saca status 200
  })
}

function getAnuncios (req, res, next) {
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
  Anuncio.list(filter, sort, limit, price, (err, anuncios) => {
    if (err) {
      if (err.name === 'CastError') {
        return next(new errorHttp.BadRequest(res.messages.CAST_ERROR))
      }
      return next(err)
    }

    if (!anuncios) return next(err)

    res.send({ anuncios })
  })
}

function saveAnuncio (req, res, next) {
  let anuncio = new Anuncio()
  anuncio.name = req.body.name
  anuncio.sales = req.body.sales
  anuncio.price = req.body.price
  anuncio.photo = req.body.photo
  anuncio.tags = req.body.tags

  anuncio.save((err, anuncioStored) => {
    if (err) next(err)

    res.send({anuncio: anuncioStored})
  })
}

function updateAnuncio (req, res, next) {
  let anunciosId = req.params.anuncioId
  let update = req.body

  Anuncio.findByIdAndUpdate(anunciosId, update, (err, anuncioUpdate) => {
    if (err) return next(err)

    res.send({ anuncio: anuncioUpdate })
  })
}

function deleteAnuncio (req, res, next) {
  let anunciosId = req.params.anuncioId

  Anuncio.delete(anunciosId, (err, anuncioDelete) => {
    if (err) next(err)

    res.send({ anuncio: anuncioDelete })
  })
}

module.exports = {
  getAnuncio,
  getAnuncios,
  saveAnuncio,
  updateAnuncio,
  deleteAnuncio
}
