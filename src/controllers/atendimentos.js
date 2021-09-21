const Atendimento = require('../models/Atendimento');

module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    Atendimento.listar()
      .then(resultado => res.json(resultado))
      .catch(error => res.status(400).json(error))
  })

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    Atendimento.exibir(id)
      .then(resultado => res.json(resultado))
      .catch(error => res.status(400).json(error))
  })

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body;

    Atendimento.adicionar(atendimento)
      .then(atendimentoCadastrado => {
        console.log(atendimentoCadastrado)
        res.status(201).json(atendimentoCadastrado)
      })
      .catch(error => {
        console.log(error)
        res.status(400).json(error)
      })
  })

  app.patch('/atendimentos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const atendimento = req.body;

    Atendimento.alterar(id, atendimento)
      .then(atendimento => res.json(atendimento))
      .catch(error => res.status(400).json())
  })

  app.delete('/atendimentos/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    Atendimento.remover(id)
      .then(resultado => res.json(resultado))
      .catch(error => res.status(400).json(error))
  })

}