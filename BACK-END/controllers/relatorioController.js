const Relatorio = require("../models/relatorioModel");

module.exports = {
  async index(req, res) {
    try {
      const data = await Relatorio.findAll();
      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao listar relatórios." });
    }
  },

  async show(req, res) {
    try {
      const data = await Relatorio.findById(req.params.id);
      if (!data)
        return res.status(404).json({ error: "Relatório não encontrado." });

      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar relatório." });
    }
  },

  async store(req, res) {
    try {
      const novo = await Relatorio.create(req.body);
      res.status(201).json({ status: "ok", data: novo });
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar relatório." });
    }
  },

  async update(req, res) {
    res.status(501).json({ message: "Update não implementado ainda." });
  },

  async destroy(req, res) {
    res.status(501).json({ message: "Delete não implementado ainda." });
  }
};
