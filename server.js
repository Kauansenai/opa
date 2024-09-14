const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // altere se o usuário do MySQL for diferente
  password: '', // insira a senha do MySQL
  database: 'empresa'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao MySQL');
});

// Rota para criar um colaborador
app.post('/colaboradores', (req, res) => {
  const { nome, cpf, email, cargo, epi } = req.body;
  const sql = 'INSERT INTO colaboradores (nome, cpf, email, cargo, epi) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nome, cpf, email, cargo, epi], (err, result) => {
    if (err) throw err;
    res.send('Colaborador criado com sucesso!');
  });
});

// Rota para listar todos os colaboradores
app.get('/colaboradores', (req, res) => {
  const sql = 'SELECT * FROM colaboradores';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Rota para atualizar um colaborador
app.put('/colaboradores/:id', (req, res) => {
  const { nome, cpf, email, cargo, epi } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE colaboradores SET nome = ?, cpf = ?, email = ?, cargo = ?, epi = ? WHERE id = ?';
  db.query(sql, [nome, cpf, email, cargo, epi, id], (err, result) => {
    if (err) throw err;
    res.send('Colaborador atualizado com sucesso!');
  });
});

// Rota para excluir um colaborador
app.delete('/colaboradores/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM colaboradores WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Colaborador excluído com sucesso!');
  });
});

// Iniciar o servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
