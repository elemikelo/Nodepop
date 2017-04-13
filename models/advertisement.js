'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const advertisementSchema = Schema({
  name: String,
  sales: Boolean,
  price: { type: Number, default: 0 },
  photo: String,
  tags: { type: [ { type: String, enum: ['work', 'lifestyle', 'motor', 'mobile'] } ] }
})

advertisementSchema.statics.list = function (filter, sort, limit, price, cb) {
  const query = Advertisements.find(filter)
  query.sort(sort)
  query.limit(limit)
  query.exec(cb)
}

var Advertisements = mongoose.model('Advertisements', advertisementSchema)

module.exports = Advertisements
