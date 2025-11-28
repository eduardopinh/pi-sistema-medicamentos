const SinalVital = require("../models/sinalVitalModel");

module.exports = {
  async index(req, res) {
    try {
      const data = await SinalVital.findAll();
      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao listar sinais vitais" });
    }
  },

  async show(req, res) {
    try {
      const data = await SinalVital.findById(req.params.id);
      if (!data)
        return res.status(404).json({ error: "Sinal vital não encontrado" });

      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar sinal vital" });
    }
  },

  async store(req, res) {
    try {
      const novo = await SinalVital.create(req.body);
      res.status(201).json({ status: "ok", data: novo });
    } catch (err) {
      res.status(500).json({ error: "Erro ao registrar sinal vital" });
    }
  },

  async update(req, res) {
    res.status(501).json({ message: "Update não implementado" });
  },

  async destroy(req, res) {
    res.status(501).json({ message: "Delete não implementado" });
  }
};
