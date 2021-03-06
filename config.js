module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || 'mongodb://localhost:27017/nodepop',
  SECRET_TOKEN: process.env.SECRET_TOKEN || 'miclaveultrasecretadetoken',
  expireIn: '14d', // Tiempo que caduca token
  languages: ['en', 'es'] // idiomas mensajes
}
