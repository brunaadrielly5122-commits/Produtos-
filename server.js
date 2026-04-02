const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let produtos = [];
let id = 1;

// CREATE
app.post('/produtos', (req, res) => {
  const produto = {
    id: id++,
    nome: req.body.nome,
    preco: req.body.preco
  };
  produtos.push(produto);
  res.json(produto);
});

// READ
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// UPDATE
app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const produto = produtos.find(p => p.id == id);

  if (produto) {
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    res.json(produto);
  } else {
    res.status(404).json({ erro: 'Produto não encontrado' });
  }
});

// DELETE
app.delete('/produtos/:id', (req, res) => {
  produtos = produtos.filter(p => p.id != req.params.id);
  res.json({ mensagem: 'Produto deletado' });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
