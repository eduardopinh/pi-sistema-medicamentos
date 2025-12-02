const HorarioMedicamento = require("../models/horarioMedicamentoModel");

module.exports = {
  async index(req, res) {
    try {
      const data = await HorarioMedicamento.findAll();
      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao listar horários" });
    }
  },

  async show(req, res) {
    try {
      const data = await HorarioMedicamento.findByMedicamento(req.params.id);
      res.json({ status: "ok", data });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar horários" });
    }
  },

  async store(req, res) {
    try {
      const novo = await HorarioMedicamento.create(req.body);
      res.status(201).json({ status: "ok", data: novo });
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar horário" });
    }
  },

  async update(req, res) {
    res.status(501).json({ message: "Update não implementado" });
  },

  async destroy(req, res) {
    res.status(501).json({ message: "Delete não implementado" });
  }
};
