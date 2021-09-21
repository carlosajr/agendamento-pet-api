const query = require('../infra/database/query')

class Atendimento {
  adicionar(atendimento) {
    const sql = 'INSERT INTO Atendimentos SET ?'

    return query.execute(sql, atendimento)
  }

  listar() {
    const sql = 'SELECT * FROM Atendimentos'

    return query.execute(sql)
  }

  exibir(id) {
    const sql = 'SELECT * FROM Atendimentos WHERE id = ?';

    return query.execute(sql, id)
  }

  alterar(id, atendimento) {
    const sql = "UPDATE Atendimentos SET ? WHERE id = ?";

    return query.execute(sql, atendimento)
  }

  remover(id) {
    const sql = "DELETE FROM Atendimentos WHERE id=?";

    return query.execute(sql, id)
  }
}

module.exports = new Atendimento()