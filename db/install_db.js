const path = require('path')
const promises = require('../services/utils').promises

require('../server')
const Advertisement = require('../models/advertisement')
const User = require('../models/user')

Promise.all([
  Advertisement.deleteMany(),
  User.deleteMany()
]).then(() => promises.readFile(path.join(__dirname, 'install.json')))
  .then(promises.jsonBuffer)
  .then(json => Promise.all([
    User.insertMany(json.users),
    Advertisement.insertMany(json.advertisements)
  ]))
  .then((data) => {
    console.log('Installed DB')
    console.log('Users:', data[0].map(item => item.username))
    console.log('Advertisements:', data[1].map(item => item.name))
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error installing DB:', err)
    process.exit(1)
  })
