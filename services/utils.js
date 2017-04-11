const fs = require('fs');

module.exports = {

  promises: {
    jsonBuffer (buffer) {
      return new Promise((resolve, reject) => {
        try {
          resolve(JSON.parse(buffer.toString()))
        } catch (err) {
          reject(err)
        }
      })
    },

    readFile (path) {
      return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
          if (err) {
            return reject(err)
          }
          return resolve(data)
        })
      })
    }
  }
}
