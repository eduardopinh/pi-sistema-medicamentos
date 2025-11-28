const Consulta = require("../models/consultaModel");

module.exports = {
  async index(req, res) {
    try {
      const data = await Consulta.findAll();
      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao listar consultas" });
    }
  },

  async show(req, res) {
    try {
      const data = await Consulta.findById(req.params.id);
      if (!data)
        return res.status(404).json({ error: "Consulta não encontrada" });

      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar consulta" });
    }
  },

  async store(req, res) {
    try {
      const novo = await Consulta.create(req.body);
      res.status(201).json({ status: "ok", data: novo });
    } catch (err) {
      res.status(500).json({ error: "Erro ao registrar consulta" });
    }
  },

  async update(req, res) {
    res.status(501).json({ message: "Update não implementado" });
  },

  async destroy(req, res) {
    res.status(501).json({ message: "Delete não implementado" });
  }
};
