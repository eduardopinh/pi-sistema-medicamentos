const Medicamento = require("../models/medicamentoModel");

module.exports = {
  async index(req, res) {
    try {
      const data = await Medicamento.findAll();
      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao listar medicamentos" });
    }
  },

  async show(req, res) {
    try {
      const data = await Medicamento.findById(req.params.id);
      if (!data)
        return res.status(404).json({ error: "Medicamento não encontrado" });

      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar medicamento" });
    }
  },

  async store(req, res) {
    try {
      const novo = await Medicamento.create(req.body);
      res.status(201).json({ status: "ok", data: novo });
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar medicamento" });
    }
  },

  async update(req, res) {
    res.status(501).json({ message: "Update não implementado" });
  },

  async destroy(req, res) {
    res.status(501).json({ message: "Delete não implementado" });
  }
};
