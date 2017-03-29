'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()

// Middlewares
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use('/apiv1', require('./routes/anuncio'))
app.use('/apiv1/users', require('./routes/user'))

// catch 404 and forward to error handler ; captura y reenvia al manejador de errores
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler ; Manejador de Errores
app.use(function (err, req, res, next) {
  res.status(err.status || 500)

  if (isAPI(req)) {
    res.json({success: false, error: err.message})
    return
  }
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.render('error')
})

function isAPI (req) {
  return req.originalUrl.indexOf('/apiv') === 0
}

module.exports = app
