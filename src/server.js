const customExpress = require('./config/customExpress');
const conexao = require('./infra/conexao');
const Tabelas = require('./infra/Tabelas');

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  } else {
    Tabelas.init(conexao);

    app = customExpress();

    app.listen(3000, () => {
      console.log('Server Running on port 3000')
    })
  }
})
