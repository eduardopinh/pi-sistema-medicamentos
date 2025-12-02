const bcrypt = require("bcrypt");
const Administrador = require("../models/AdministradorModel");

module.exports = {

  // GET /administrador
  async index(req, res) {
    try {
      const admins = await Administrador.findAll();
      return res.json({ status: "ok", data: admins });
    } catch (err) {
      console.error("Erro em administrador.index:", err);
      return res.status(500).json({ status: "erro", message: "Erro ao buscar administradores." });
    }
  },

  // GET /administrador/:id
  async show(req, res) {
    try {
      const { id } = req.params;
      const admin = await Administrador.findById(id);

      if (!admin) {
        return res.status(404).json({ status: "erro", message: "Administrador não encontrado." });
      }

      return res.json({ status: "ok", data: admin });
    } catch (err) {
      console.error("Erro em administrador.show:", err);
      return res.status(500).json({ status: "erro", message: "Erro ao buscar administrador." });
    }
  },

  // POST /administrador
  async store(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({
          status: "erro",
          message: "Nome, email e senha são obrigatórios."
        });
      }

      const adminExists = await Administrador.findByEmail(email);
      if (adminExists) {
        return res.status(409).json({
          status: "erro",
          message: "Email já cadastrado."
        });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const novoAdmin = await Administrador.create(nome, email, senhaHash);

      return res.status(201).json({
        status: "ok",
        message: "Administrador criado com sucesso.",
        data: novoAdmin
      });

    } catch (err) {
      console.error("Erro em administrador.store:", err);
      return res.status(500).json({ status: "erro", message: "Erro ao criar administrador." });
    }
  },

  // PUT /administrador/:id
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;

      const rowsAffected = await Administrador.update(id, nome, email);

      if (rowsAffected === 0) {
        return res.status(404).json({ status: "erro", message: "Administrador não encontrado." });
      }

      return res.json({
        status: "ok",
        message: "Administrador atualizado com sucesso.",
        data: { id_adm: id, nome, email }
      });

    } catch (err) {
      console.error("Erro em administrador.update:", err);
      return res.status(500).json({ status: "erro", message: "Erro ao atualizar administrador." });
    }
  },

  // DELETE /administrador/:id
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const rowsAffected = await Administrador.delete(id);

      if (rowsAffected === 0) {
        return res.status(404).json({ status: "erro", message: "Administrador não encontrado." });
      }

      return res.json({
        status: "ok",
        message: "Administrador removido com sucesso."
      });

    } catch (err) {
      console.error("Erro em administrador.destroy:", err);
      return res.status(500).json({ status: "erro", message: "Erro ao remover administrador." });
    }
  }
};
    