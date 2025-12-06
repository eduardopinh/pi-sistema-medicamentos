// BACK-END/app.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

// Conexão com o banco
const connectDB = require("./config/database");
connectDB();

// -------------------------------------------
// GARANTIR QUE A PASTA DE UPLOAD EXISTE
// -------------------------------------------
const uploadsBase = path.join(__dirname, "uploads");
const idososFolder = path.join(uploadsBase, "idosos");
const medicamentoRoutes = require("./routes/medicamentoRoutes");

if (!fs.existsSync(idososFolder)) {
  fs.mkdirSync(idososFolder, { recursive: true });
}

// -------------------------------------------
// MIDDLEWARES
// -------------------------------------------
app.use(cors());
app.use(express.json());

// Servir arquivos de imagem enviados via upload
// Ex.: http://localhost:3000/uploads/idosos/xpto.png
app.use("/uploads", express.static(uploadsBase));

// Servir o FRONT-END como estático
app.use(express.static(path.join(__dirname, "..", "FRONT-END")));

// -------------------------------------------
// ROTAS DA API
// -------------------------------------------
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/idosos", require("./routes/idosoRoutes"));
app.use("/api/medicamentos", medicamentoRoutes);

// -------------------------------------------
// ROTA RAIZ — abre index.html
// -------------------------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "FRONT-END", "index.html"));
});

// -------------------------------------------
// ROTA 404 (fallback)
// -------------------------------------------
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

module.exports = app;
