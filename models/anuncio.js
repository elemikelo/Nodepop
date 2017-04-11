'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const anuncioSchema = Schema({
  name: String,
  sales: Boolean,
  price: { type: Number, default: 0 },
  photo: String,
  tags: { type: [ { type: String, enum: ['work', 'lifestyle', 'motor', 'mobile'] } ] }
})

anuncioSchema.statics.list = function (filter, sort, limit, price, cb) {
  const query = Anuncio.find(filter)
  query.sort(sort)
  query.limit(limit)
  query.exec(cb)
}

var Anuncio = mongoose.model('Anuncio', anuncioSchema)

module.exports = Anuncio
