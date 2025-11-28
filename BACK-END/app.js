// ===============================
// Imports principais
// ===============================
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// ===============================
// Importação das rotas
// ===============================
const authRoutes = require("./routes/authRoutes");
const administracaoRoutes = require("./routes/administracaoRoutes");
const administradorRoutes = require("./routes/administradorRoutes");
const alertaRoutes = require("./routes/alertaRoutes");
const consultaRoutes = require("./routes/consultaRoutes");
const cuidadorRoutes = require("./routes/cuidadorRoutes");
const doencaRoutes = require("./routes/doencaRoutes");
const familiarRoutes = require("./routes/familiarRoutes");
const horarioMedicamentoRoutes = require("./routes/horarioMedicamentoRoutes");
const idosoRoutes = require("./routes/idosoRoutes");
const medicamentoRoutes = require("./routes/medicamentoRoutes");
const sinalVitalRoutes = require("./routes/sinalVitalRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas principais
app.use("/auth", authRoutes);
app.use("/administracao", administracaoRoutes);
app.use("/administrador", administradorRoutes);
app.use("/alerta", alertaRoutes);
app.use("/consulta", consultaRoutes);
app.use("/cuidador", cuidadorRoutes);
app.use("/doenca", doencaRoutes);
app.use("/familiar", familiarRoutes);
app.use("/horario-medicamento", horarioMedicamentoRoutes);
app.use("/idoso", idosoRoutes);
app.use("/medicamento", medicamentoRoutes);
app.use("/sinal-vital", sinalVitalRoutes);
app.use("/usuarios", usuariosRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API funcionando. Disponível em múltiplas rotas."
  });
});

module.exports = app;
