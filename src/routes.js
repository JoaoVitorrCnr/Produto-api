const express = require('express');
const { getProdutos, getProdutoPorId, criarProduto, atualizarProduto, deletarProduto } = require('./products');

const roteador = express.Router();

roteador.get('/products', getProdutos);
roteador.get('/products/:id', getProdutoPorId);
roteador.post('/products', criarProduto);
roteador.put('/products/:id', atualizarProduto);
roteador.delete('/products/:id', deletarProduto);

module.exports = roteador;
