const Medicamento = require("../models/medicamentoModel");

module.exports = {
  async listar(req, res) {
    try {
      const meds = await Medicamento.find().sort({ createdAt: -1 });
      res.json(meds);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar medicamentos." });
    }
  },

  async buscar(req, res) {
    try {
      const med = await Medicamento.findById(req.params.id);
      if (!med) return res.status(404).json({ error: "Medicamento não encontrado." });
      res.json(med);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar medicamento." });
    }
  },

  async criar(req, res) {
    try {
      const body = req.body;

      const payload = {
        nome: body.nome,
        classificacao: body.classificacao,
        medico: body.medico,
        especialidade: body.especialidade,
        estoque: Number(body.estoque),
        instrucoes: body.instrucoes,
        horarios: JSON.parse(body.horarios || "[]")
      };

      if (req.file) {
        payload.foto = `/uploads/medicamentos/${req.file.filename}`;
      }

      const novo = await Medicamento.create(payload);
      res.status(201).json(novo);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar medicamento." });
    }
  },

  async atualizar(req, res) {
    try {
      const body = req.body;

      const payload = {
        nome: body.nome,
        classificacao: body.classificacao,
        medico: body.medico,
        especialidade: body.especialidade,
        estoque: Number(body.estoque),
        instrucoes: body.instrucoes,
        horarios: JSON.parse(body.horarios || "[]")
      };

      if (req.file) {
        payload.foto = `/uploads/medicamentos/${req.file.filename}`;
      }

      const atualizado = await Medicamento.findByIdAndUpdate(req.params.id, payload, { new: true });

      if (!atualizado) return res.status(404).json({ error: "Medicamento não encontrado." });

      res.json(atualizado);

    } catch (err) {
      res.status(500).json({ error: "Erro ao atualizar medicamento." });
    }
  },

  async deletar(req, res) {
    try {
      const med = await Medicamento.findByIdAndDelete(req.params.id);
      if (!med) return res.status(404).json({ error: "Não encontrado" });

      res.json({ message: "Medicamento removido." });
    } catch (err) {
      res.status(500).json({ error: "Erro ao deletar medicamento." });
    }
  }
};
