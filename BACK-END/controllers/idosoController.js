// BACK-END/controllers/idosoController.js
const Idoso = require("../models/idosoModel");
const fs = require("fs");
const path = require("path");

// Caso algum campo venha como JSON string (via FormData)
function tryParseJSON(value) {
  if (!value) return null;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function toDate(val) {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d) ? null : d;
}

module.exports = {
  // ------------------------------- LISTAR -------------------------------
  async getAll(req, res) {
    try {
      const idosos = await Idoso.find().sort({ createdAt: -1 });
      return res.json(idosos);
    } catch (err) {
      console.error("Erro listar idosos:", err);
      return res.status(500).json({ error: "Erro ao listar idosos." });
    }
  },

  // ------------------------------- BUSCAR -------------------------------
  async getById(req, res) {
    try {
      const idoso = await Idoso.findById(req.params.id);
      if (!idoso) return res.status(404).json({ error: "Idoso não encontrado." });
      return res.json(idoso);
    } catch (err) {
      console.error("Erro buscar idoso:", err);
      return res.status(500).json({ error: "Erro ao buscar idoso." });
    }
  },

  // ------------------------------- CRIAR -------------------------------
  async create(req, res) {
    try {
      const raw = req.body || {};

      // Sempre transformar o FormData → Arrays reais
      const contatos = tryParseJSON(raw.contatos) || [];
      const doencas = tryParseJSON(raw.doencas) || [];
      const medicamentos = tryParseJSON(raw.medicamentos) || [];
      const cuidadores = tryParseJSON(raw.cuidadores) || [];
      const sinais = tryParseJSON(raw.sinais_vitais) || [];

      const payload = {
        nome: raw.nome?.trim() || "",
        data_nasc: toDate(raw.data_nasc),
        telefone: raw.telefone || "",
        informacoes: raw.informacoes || "",
        contatos,
        doencas,
        medicamentos,
        cuidadores,
        sinais_vitais: sinais
      };

      if (!payload.nome) {
        return res.status(400).json({ error: "Nome é obrigatório." });
      }

      // Foto enviada?
      if (req.file) {
        payload.foto = `/uploads/idosos/${req.file.filename}`;
      }

      const novo = await Idoso.create(payload);
      return res.status(201).json(novo);

    } catch (err) {
      console.error("Erro ao criar idoso:", err);
      return res.status(500).json({ error: "Erro ao criar idoso." });
    }
  },

  // ------------------------------- ATUALIZAR -------------------------------
  async update(req, res) {
    try {
      const raw = req.body;

      const contatos = tryParseJSON(raw.contatos) || [];
      const doencas = tryParseJSON(raw.doencas) || [];
      const medicamentos = tryParseJSON(raw.medicamentos) || [];
      const cuidadores = tryParseJSON(raw.cuidadores) || [];
      const sinais = tryParseJSON(raw.sinais_vitais) || [];

      const payload = {};

      if (raw.nome !== undefined) payload.nome = raw.nome.trim();
      if (raw.data_nasc !== undefined) payload.data_nasc = toDate(raw.data_nasc);
      if (raw.telefone !== undefined) payload.telefone = raw.telefone;
      if (raw.informacoes !== undefined) payload.informacoes = raw.informacoes;

      payload.contatos = contatos;
      payload.doencas = doencas;
      payload.medicamentos = medicamentos;
      payload.cuidadores = cuidadores;
      payload.sinais_vitais = sinais;

      // Foto nova enviada
      if (req.file) {
        payload.foto = `/uploads/idosos/${req.file.filename}`;
      }

      const atualizado = await Idoso.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true }
      );

      if (!atualizado) {
        return res.status(404).json({ error: "Idoso não encontrado." });
      }

      return res.json(atualizado);

    } catch (err) {
      console.error("Erro ao atualizar idoso:", err);
      return res.status(500).json({ error: "Erro ao atualizar idoso." });
    }
  },

  // ------------------------------- DELETAR -------------------------------
  async delete(req, res) {
    try {
      const idoso = await Idoso.findByIdAndDelete(req.params.id);
      if (!idoso) return res.status(404).json({ error: "Idoso não encontrado." });

      // Remover foto do disco (se existir)
      if (idoso.foto) {
        const filePath = path.join(__dirname, "..", idoso.foto);
        fs.unlink(filePath, (err) => {
          if (err) console.warn("Erro ao remover foto:", err.message);
        });
      }

      return res.json({ message: "Idoso removido com sucesso." });

    } catch (err) {
      console.error("Erro deletar idoso:", err);
      return res.status(500).json({ error: "Erro ao deletar idoso." });
    }
  },
};
