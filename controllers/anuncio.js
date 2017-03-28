'use strict'

const Anuncio = require('../models/anuncio')

function getAnuncio (req, res) {
  let anuncioId = req.params.anuncioId

  Anuncio.findById(anuncioId, (err, anuncio) => {
    if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if (!anuncio) return res.status(404).send({message: `El anuncio no existe`})

    res.status(200).send({anuncio}) // anuncio : anuncio
  })
}

function getAnuncios (req, res) {
  Anuncio.find({}, (err, anuncios) => {
    if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if (!anuncios) return res.status(404).send({message: `No existen productos`})

    res.status(200).send({anuncios}) // anuncios: anuncios , sintaxis de ECMACrips6
  })
}

function saveAnuncio (req, res) {
  console.log('POST /api/product')
  console.log(req.body)

  let anuncio = new Anuncio()
  anuncio.name = req.body.name
  anuncio.sales = req.body.sales
  anuncio.price = req.body.price
  anuncio.photo = req.body.photo
  anuncio.tags = req.body.tags

  anuncio.save((err, anuncioStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({anuncio: anuncioStored})
  })
}

function updateAnuncio (req, res) {
  let anunciosId = req.params.anuncioId
  let update = req.body

  Anuncio.findByIdAndUpdate(anunciosId, update, (err, anuncioUpdate) => {
    if (err) res.status(500).send({message: `Error al actualizar el anuncio: ${err}`})

    res.status(200).send({ anuncio: anuncioUpdate })
  })
}

function deleteAnuncio (req, res) {
  let anunciosId = req.params.anuncioId
  let update = req.body

  Anuncio.findByIdAndUpdate(anunciosId, update, (err, anuncioUpdate) => {
    if (err) res.status(500).send({message: `Error al actualizar el anuncio: ${err}`})

    res.status(200).send({ anuncio: anuncioUpdate })
  })
}

module.exports = {
  getAnuncio,
  getAnuncios,
  saveAnuncio,
  updateAnuncio,
  deleteAnuncio
}
