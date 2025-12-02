const Administracao = require("../models/administracaoModel");

module.exports = {
  async index(req, res) {
    try {
      const data = await Administracao.findAll();
      res.json({ status: "ok", data });
    } catch (err) {
      console.error("Erro administracao.index:", err);
      res.status(500).json({ error: "Erro ao listar administrações" });
    }
  },

  async show(req, res) {
    try {
      const data = await Administracao.findById(req.params.id);
      if (!data)
        return res.status(404).json({ error: "Administração não encontrada" });

      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar administração" });
    }
  },

  async store(req, res) {
    try {
      const novo = await Administracao.create(req.body);
      res.status(201).json({ status: "ok", data: novo });
    } catch (err) {
      res.status(500).json({ error: "Erro ao registrar administração" });
    }
  },

  async update(req, res) {
    res.status(501).json({ message: "Update não implementado ainda" });
  },

  async destroy(req, res) {
    res.status(501).json({ message: "Delete não implementado ainda" });
  }
};
