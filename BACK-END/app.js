const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");

const app = express();

// Middlewares Globais
app.use(cors()); // permite acesso do front
app.use(express.json()); // aceita JSON
app.use(express.urlencoded({ extended: true })); // aceita forms (opcional)

// Rotas da API
app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);

// Teste rápido para ver se o backend sobe
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API funcional. Use /auth ou /usuarios."
  });
});

module.exports = app;
