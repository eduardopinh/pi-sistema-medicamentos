const Notificacao = require("../models/notificacaoWhatsModel");

module.exports = {
  async index(req, res) {
    try {
      const data = await Notificacao.findAll();
      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao listar notificações." });
    }
  },

  async show(req, res) {
    try {
      const data = await Notificacao.findById(req.params.id);
      if (!data)
        return res.status(404).json({ error: "Notificação não encontrada." });

      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar notificação." });
    }
  },

  async store(req, res) {
    try {
      const nova = await Notificacao.create(req.body);
      res.status(201).json({ status: "ok", data: nova });
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar notificação." });
    }
  },

  async update(req, res) {
    res.status(501).json({ message: "Update não implementado ainda." });
  },

  async destroy(req, res) {
    res.status(501).json({ message: "Delete não implementado ainda." });
  }
};
