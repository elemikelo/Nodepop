'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnuncioSchema = Schema({
  name: String,
  sales: Boolean,
  price: { type: Number, default: 0 },
  photo: String,
  tags: [String]
})

module.exports = mongoose.model('Anuncios', AnuncioSchema)
