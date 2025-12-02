const Doenca = require("../models/doencaModel");

module.exports = {
  async index(req, res) {
    try {
      const data = await Doenca.findAll();
      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao listar doenças" });
    }
  },

  async show(req, res) {
    try {
      const data = await Doenca.findById(req.params.id);
      if (!data)
        return res.status(404).json({ error: "Doença não encontrada" });

      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar doença" });
    }
  },

  async store(req, res) {
    try {
      const novo = await Doenca.create(req.body);
      res.status(201).json({ status: "ok", data: novo });
    } catch (err) {
      res.status(500).json({ error: "Erro ao registrar doença" });
    }
  },

  async update(req, res) {
    res.status(501).json({ message: "Update não implementado" });
  },

  async destroy(req, res) {
    res.status(501).json({ message: "Delete não implementado" });
  }
};
