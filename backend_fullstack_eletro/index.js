import cors from "cors";
import express from "express";
import mysql from "mysql";

var app = express();
app.use(express.json());
app.use(cors());

// Conexao com o Banco

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "recode",
});

app.get("/pedidos/", function (req, res) {
  connection.query("SELECT * from pedidos", (error, result) => {
    console.log(result);
    res.json(result);
  });
});

app.get("/pedidos/:id", function (req, res) {
  const id = req.params.id;
  connection.query(
    `SELECT * FROM pedidos INNER JOIN cliente ON pedidos.id_cliente=cliente.id_cliente INNER JOIN produtos ON pedidos.idproduto=produtos.idproduto where cliente.id_cliente = ${id}`,
    (error, result) => {
      res.json(result);
    }
  );
});

app.get("/comentarios/", function (req, res) {
  connection.query("SELECT * from comentarios", (error, result) => {
    res.json(result);
  });
});

app.post("/comentarios/", function (req, res) {
  const { nome, mensagem } = req.body;
  connection.query(
    `INSERT INTO comentarios (id,nome,msg,data) VALUES (NULL, '${nome}', '${mensagem}',  current_timestamp())`,
    (error, result) => {
      res.json(result);
    }
  );
});

app.get("/produtos/", function (req, res) {
  connection.query("SELECT * from produtos", (error, result) => {
    console.log(result);
    res.json(result);
  });
});

app.get("/produtos/:index", function (req, res) {
  const { index } = req.params;
  res.json(produtos[index]);
});

app.post("/produtos/", function (req, res) {
  const item = req.body;
  produtos.push(item);
  res.json(item);
});

app.listen(3333, function () {});
