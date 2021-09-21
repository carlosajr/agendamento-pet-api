const axios = require('axios')
const conexao = require('../infra/database/conexao')
const repositorio = require('../repositorios/atendimento')

class Atendimento {
  async adicionar(atendimento) {
    atendimento.dataCriacao = new Date()

    if (!this.isValid(atendimento)) {
      return new Promise((resolve, reject) => reject({ error: { msg: "Existem informações faltando" } }))
    }

    return repositorio.adicionar(atendimento)
      .then(resultado => {
        const id = resultado.insertId

        return { id, ...atendimento }
      })
  }

  listar() {
    return repositorio.listar()
  }

  exibir(id) {
    repositorio.exibir(id)
      .then(async resultado => {
        const atendimento = resultado[0];
        const cpf = atendimento.cliente;

        const { data } = await axios.get(`http://127.0.0.1:8082/${cpf}`);
        atendimento.cliente = data;

        return atendimento;
      })
  }

  alterar(id, atendimento) {
    repositorio.alterar(sql, [atendimento, id])
      .then(resultado => {
        const response = { id, ...atendimento }

        return response
      })
  }

  remover(id) {
    return repositorio.remover(id)
  }

  isValid(atendimento) {
    const { cliente, pet, servico, status, data } = atendimento;

    return cliente && pet && servico && status && data ? true : false;
  }
}

module.exports = new Atendimento;
