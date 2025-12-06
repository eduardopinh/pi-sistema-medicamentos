const mongoose = require("mongoose");

const MedicamentoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    classificacao: { type: String, required: true }, // "tarja preta", "controlado", etc.

    medico: { type: String, default: "" },
    especialidade: { type: String, default: "" },

    estoque: { type: Number, default: 0 },
    instrucoes: { type: String, default: "" },

    horarios: [String], // array de horários

    foto: { type: String, default: "" } // caminho da imagem
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicamento", MedicamentoSchema);
