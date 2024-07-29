const express = require('express');
const rotas = require('./routes');

const app = express();
const PORTA = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', rotas);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORTA, () => {
    console.log(`Servidor está rodando na porta ${PORTA}`);
  });
}

module.exports = app;
