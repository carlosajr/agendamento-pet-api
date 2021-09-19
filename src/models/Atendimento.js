const conexao = require('../infra/conexao');

class Atendimento {
  async adicionar(atendimento) {
    const dataCriacao = new Date();
    atendimento = { ...atendimento, dataCriacao }

    if (!this.isValid(atendimento)) {
      return { error: { msg: "Existem informações faltando" } };
    }

    const sql = 'INSERT INTO Atendimentos SET ?'

    return new Promise(resolve => {
      conexao.query(sql, atendimento, (erro, resultado) => {
        const id = resultado.insertId;
        const response = { id, ...atendimento };

        resolve(this.done(erro, response))
      })
    });
  }

  listar() {
    const sql = 'SELECT * FROM Atendimentos'

    return new Promise(resolve => {
      conexao.query(sql, (erro, resultado) => {
        resolve(this.done(erro, resultado))
      })
    });
  }

  exibir(id) {
    const sql = 'SELECT * FROM Atendimentos WHERE id = ?';

    return new Promise(resolve => {
      conexao.query(sql, id, (erro, resultado) => {
        resolve(this.done(erro, resultado[0]))
      })
    })

  }

  alterar(id, atendimento) {
    const sql = "UPDATE Atendimentos SET ? WHERE id = ?";

    return new Promise(resolve => {
      conexao.query(sql, [atendimento, id], (erro, resultado) => {
        const response = { id, ...atendimento };

        resolve(this.done(erro, response))
      })
    })

  }

  remover(id) {
    const sql = "DELETE FROM Atendimentos WHERE id=?";

    return new Promise(resolve => {
      conexao.query(sql, id, (erro, resultado) => {
        resolve(this.done(erro, resultado))
      })
    })
  }

  isValid(atendimento) {
    const { cliente, pet, servico, status, data } = atendimento;

    return cliente && pet && servico && status && data ? true : false;
  }

  done(erro, resultado) {
    if (erro) {
      return { error: { msg: erro.sqlMessage } }
    }

    return resultado;
  }
}

module.exports = new Atendimento;
