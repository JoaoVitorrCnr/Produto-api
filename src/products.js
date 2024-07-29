let produtos = [];

exports.getProdutos = (req, res) => {
  res.status(200).json(produtos);
};

exports.getProdutoPorId = (req, res) => {
  const { id } = req.params;
  const produto = produtos.find(p => p.id === parseInt(id));
  if (!produto) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }
  res.status(200).json(produto);
};

exports.criarProduto = (req, res) => {
  const { nome, preco } = req.body;
  const novoProduto = {
    id: produtos.length + 1,
    nome,
    preco
  };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
};

exports.atualizarProduto = (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;
  const produto = produtos.find(p => p.id === parseInt(id));
  if (!produto) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }
  produto.nome = nome;
  produto.preco = preco;
  res.status(200).json(produto);
};

exports.deletarProduto = (req, res) => {
  const { id } = req.params;
  const indice = produtos.findIndex(p => p.id === parseInt(id));
  if (indice === -1) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }
  produtos.splice(indice, 1);
  res.status(204).end();
};
