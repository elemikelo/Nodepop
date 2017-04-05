'use strict'

const mongoose = require('mongoose')
const Anuncio = require('../models/anuncio')

function getAnuncio (req, res) {
  let anuncioId = req.params.anuncioId

  Anuncio.findById(anuncioId, (err, anuncio) => {
    if (err) {
      console.log({message: `Error al realizar la peticion: ${err}`})
      return res.status(500)
    }
    if (!anuncio) return res.status(404).send({message: `El anuncio no existe`})

    res.status(200).send({anuncio}) // anuncio : anuncio
  })
}

function getAnuncios (req, res) {
  const tags = req.query.tags
  const sales = req.query.sales
  const filter = {}

  if (tags) {
    filter.tags = tags
  }
  if (sales) {
    filter.sales = sales
  }

  Anuncio.list(filter, (err, anuncios) => {
    if (err) {
      console.log({message: `Error al realizar la peticion: ${err}`})
      return res.status(500)
    }
    if (!anuncios) return res.status(404).send({message: `No existen anuncios`})

    res.status(200).send({anuncios}) // anuncios: anuncios , sintaxis de ECMACrips6
  })
}

function saveAnuncio (req, res) {
  console.log(req.body)

  let anuncio = new Anuncio()
  anuncio.name = req.body.name
  anuncio.sales = req.body.sales
  anuncio.price = req.body.price
  anuncio.photo = req.body.photo
  anuncio.tags = req.body.tags

  anuncio.save((err, anuncioStored) => {
    if (err) {
      console.log({message: `Error al salvar en la base de datos: ${err}`})
      return res.status(500)
    }

    res.status(200).send({anuncio: anuncioStored})
  })
}

function updateAnuncio (req, res) {
  let anunciosId = req.params.anuncioId
  let update = req.body

  Anuncio.findByIdAndUpdate(anunciosId, update, (err, anuncioUpdate) => {
    if (err) {
      console.log({message: `Error al actualizar el anuncio: ${err}`})
      return res.status(500)
    }
    res.status(200).send({ anuncio: anuncioUpdate })
  })
}

function deleteAnuncio (req, res) {
  let anunciosId = req.params.anuncioId

  Anuncio.delete(anunciosId, (err, anuncioDelete) => {
    if (err) {
      console.log({message: `Error al eliminar el anuncio: ${err}`})
      return res.status(500)
    }
    res.status(200).send({ anuncio: anuncioDelete })
  })
}

module.exports = {
  getAnuncio,
  getAnuncios,
  saveAnuncio,
  updateAnuncio,
  deleteAnuncio
}
