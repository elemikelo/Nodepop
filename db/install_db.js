const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')

const Anuncio = require('../models/anuncio')
const User = require('../models/user')

require('../server')

function readFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) return reject(err)
      const jsonParser = JSON.parse(data.toString())

      return resolve(jsonParser)
    })
  })
}

Promise.all([
  Anuncio.deleteMany(),
  User.deleteMany()])
  .then(readFile(path.join(__dirname, 'install.json')))
  .then(json => Promise.all([
    User.insertMany(json.users),
    Anuncio.insertMany(json.Anuncio)
  ]))
  .catch((err) => {
    console.error('Error installing DB:', err)
    process.exit(1)
  })
