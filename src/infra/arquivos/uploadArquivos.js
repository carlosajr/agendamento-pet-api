const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeArquivo, callbackImagemCriada) => {
  const tipo = path.extname(caminho)
  const caminhoDestino = `./src/assets/img/${nomeArquivo}${tipo}`;

  if (!isValid(tipo)) {
    const error = { error: { msg: "Tipo do arquivo Invalido" } };

    return callbackImagemCriada(error)
  }

  fs.createReadStream(caminho)
    .pipe(fs.createWriteStream(caminhoDestino))
    .on('finish', () => callbackImagemCriada(false, caminhoDestino))
}

function isValid(tipo) {
  const tiposValidos = ['.jpg', '.jpeg', '.png'];

  return tiposValidos.includes(tipo)
}