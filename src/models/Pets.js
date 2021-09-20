const conexao = require('../infra/conexao');
const uploadArquivo = require('../arquivos/uploadArquivos')

class Pets {
  adiciona(pet) {
    const query = "INSERT INTO Pets SET ?"

    return new Promise(resolve => {
      uploadArquivo(pet.imagem, pet.nome, (error, caminhoDestino) => {
        if (error) {
          return resolve(error)
        }

        pet.imagem = caminhoDestino;

        conexao.query(query, pet, (erro, resultado) => {
          if (!erro) {
            pet.id = resultado.insertId;
          }

          resolve(this.done(erro, pet))
        })
      })
    })
  }


  done(erro, resultado) {
    if (erro) {
      return { error: { msg: erro.sqlMessage } }
    }

    return resultado;
  }
}

module.exports = new Pets()