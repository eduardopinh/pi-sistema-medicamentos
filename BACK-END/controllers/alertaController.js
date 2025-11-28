const Alerta = require("../models/alertaModel");

module.exports = {
  async index(req, res) {
    try {
      const data = await Alerta.findAll();
      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao listar alertas" });
    }
  },

  async show(req, res) {
    try {
      const data = await Alerta.findById(req.params.id);
      if (!data) return res.status(404).json({ error: "Alerta não encontrado" });

      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar alerta" });
    }
  },

  async store(req, res) {
    try {
      const novo = await Alerta.create(req.body);
      res.status(201).json({ status: "ok", data: novo });
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar alerta" });
    }
  },

  async update(req, res) {
    res.status(501).json({ message: "Update não implementado" });
  },

  async destroy(req, res) {
    res.status(501).json({ message: "Delete não implementado" });
  }
};
