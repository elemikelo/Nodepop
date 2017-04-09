const configLangs = require('../config')

function messageLanguage (req, res, next) {
  // o requiere algun lenguaje o sino en Ingles
  const lang = req.acceptsLanguages(configLangs.languages) || configLangs[0]

  res.language = lang
  res.messages = require(`./message_types/${lang.toUpperCase()}`)
  next()
}

module.exports = messageLanguage
