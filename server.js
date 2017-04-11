'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
const cluster = require('cluster')

mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }

console.log('Conexion a la base de datos establecida')

  if (cluster.isMaster) {

      // arrancar clones
      const numCPUs = require('os').cpus().length

      for(let i = 0; i < numCPUs; i++) {
          cluster.fork();
      }

   } 

  else {

    app.listen(config.port, () => {
      console.log(`API REST corriendo en http://localhost:${config.port}`)
    })
  }
})
