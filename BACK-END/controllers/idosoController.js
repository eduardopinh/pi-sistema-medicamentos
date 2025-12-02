const Idoso = require("../models/idosoModel");

module.exports = {
  async index(req, res) {
    try {
      const data = await Idoso.findAll();
      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao listar idosos" });
    }
  },

  async show(req, res) {
    try {
      const data = await Idoso.findById(req.params.id);
      if (!data)
        return res.status(404).json({ error: "Idoso não encontrado" });

      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar idoso" });
    }
  },

  async store(req, res) {
    try {
      const novo = await Idoso.create(req.body);
      res.status(201).json({ status: "ok", data: novo });
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar idoso" });
    }
  },

  async update(req, res) {
    res.status(501).json({ message: "Update não implementado" });
  },

  async destroy(req, res) {
    res.status(501).json({ message: "Delete não implementado" });
  }
};
