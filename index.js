'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Anuncio = require('./models/anuncio')


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/apiv1/anuncios', (req, res) => {
  Anuncio.find({}, (err, anuncios) => {
    if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
    if (!anuncios) return res.status(404).send( {message: `No existen productos`})

    res.status(200).send({anuncios}); // anuncios: anuncios , sintaxis de ECMACrips6
  })
})

app.get('/apiv1/anuncios/:anuncioId', (req, res) => {
  let anuncioId = req.params.anuncioId;

  Anuncio.findById(anuncioId, (err, anuncio) => {
    if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
    if (!anuncio) return res.status(404). send({ message: `El anuncio no existe`});

    res.status(200).send({ anuncio }) //anuncio : anuncio
  })

})

app.post('/apiv1/anuncios', (req, res) => {
  console.log('POST /api/product');
  console.log(req.body);

  let anuncio = new Anuncio();
  anuncio.name = req.body.name
  anuncio.sales = req.body.sales
  anuncio.price = req.body.price
  anuncio.photo = req.body.photo
  anuncio.tags = req.body.tags

  anuncio.save((err, anuncioStored) => {
    if (err) res.status(500).send( { message: `Error al salvar en la base de datos: ${err}`});

    res.status(200).send( { anuncio: anuncioStored });
  });
});

app.put('/apiv1/anuncios/:anuncioId', (req, res) => {
  let anunciosId = req.params.anuncioId
  let update = req.body

  Anuncio.findByIdAndUpdate(anunciosId, update, (err, anuncioUpdate) => {
    if (err) res.status(500).send( { message: `Error al actualizar el anuncio: ${err}`});

    res.status(200).send({ anuncio: anuncioUpdate });
  })
})

app.delete('/apiv1/anuncios/:anuncioId', (req, res) => {
  let anuncioId = req.params.anuncioId

  Anuncio.findById(anuncioId, (err, anuncio) => {
    if (err) res.status(500).send( { message: `Error al borrar el anuncio: ${err}`});

    anuncio.remove(err => {
      if (err) res.status(500).send( { message: `Error al borrar el anuncio: ${err}`});
      res.status(200).send({ message: 'El producto ha sido eliminado'})
    })
  })
})

mongoose.connect('mongodb://localhost:27017/nodepop', (err, res) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`);
  }

  console.log('Conexion a la base de datos establecida');
  app.listen(port,() => {
    console.log(`API REST corriendo en http://localhost:${port}`);
  });
});
