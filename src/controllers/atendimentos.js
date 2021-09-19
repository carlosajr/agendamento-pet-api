const Atendimento = require('../models/Atendimento');

module.exports = app => {
  app.get('/atendimentos', async (req, res) => {
    const atendimentos = await Atendimento.listar();

    done(atendimentos, res);
  })

  app.get('/atendimentos/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const atendimento = await Atendimento.exibir(id);

    done(atendimento, res);
  })

  app.post('/atendimentos', async (req, res) => {
    const atendimento = req.body;

    const result = await Atendimento.adicionar(atendimento);

    done(result, res);
  })

  app.patch('/atendimentos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const atendimento = req.body;

    const result = await Atendimento.alterar(id, atendimento);

    done(result, res);
  })

  app.delete('/atendimentos/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const result = await Atendimento.remover(id);

    done(result, res);
  })

}

function done(result, res) {
  if (result) {
    if (result.error) {
      return res.status(400).json(result.error);
    }

    return res.status(201).json(result);
  }

  return res.status(404).json({ msg: "Nenhum registro encontrado" });
}