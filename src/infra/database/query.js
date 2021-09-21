const conexao = require('./conexao');

const execute = (query, parametros = '') => {
  return new Promise((resolve, reject) => {
    conexao.query(query, parametros, (error, resultado) => {
      if (error) {
        return reject(error)
      }

      return resolve(resultado);
    })
  })
}

module.exports = { execute };