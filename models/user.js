'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10

const UserSchema = new Schema({
  username: String,
  email: { type: String, unique: true, lowercase: true },
  password: { type: String }, // si ponemos select: false no aparecerá en el query
  createAt: { type: Date, default: Date.now() },
  lastLogin: Date
})

UserSchema.pre('save', function (next) {
  let user = this
  if (!user.isModified('password')) return next() // si la pass es modificada o es nueva

  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    if (err) return next(new Error('Error Save password'))
    user.password = hash
    next()
  })
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
