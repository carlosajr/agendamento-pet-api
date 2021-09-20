const Pets = require('../models/Pets')

module.exports = app => {
  app.post('/pets', async (req, res) => {
    const pet = req.body;

    const response = await Pets.adiciona(pet);

    done(response, res);
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