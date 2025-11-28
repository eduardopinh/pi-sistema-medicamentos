const db = require("../config/database");
const bcrypt = require("bcrypt");

module.exports = {

  // GET /usuarios
  async index(req, res) {
    try {
      const [rows] = await db.query("SELECT id, nome, email FROM usuarios");

      return res.json({
        status: "ok",
        data: rows
      });

    } catch (err) {
      console.error("Erro em usuarios.index:", err);
      return res.status(500).json({
        status: "erro",
        message: "Erro ao buscar usuários."
      });
    }
  },

  // GET /usuarios/:id
  async show(req, res) {
    try {
      const { id } = req.params;

      const [rows] = await db.query(
        "SELECT id, nome, email FROM usuarios WHERE id = ?",
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).json({
          status: "erro",
          message: "Usuário não encontrado."
        });
      }

      return res.json({
        status: "ok",
        data: rows[0]
      });

    } catch (err) {
      console.error("Erro em usuarios.show:", err);
      return res.status(500).json({
        status: "erro",
        message: "Erro ao buscar usuário."
      });
    }
  },

  // POST /usuarios
  async store(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({
          status: "erro",
          message: "Nome, email e senha são obrigatórios."
        });
      }

      // Verifica se email já existe
      const [exists] = await db.query(
        "SELECT id FROM usuarios WHERE email = ?",
        [email]
      );

      if (exists.length > 0) {
        return res.status(409).json({
          status: "erro",
          message: "Email já está cadastrado."
        });
      }

      // Criptografa a senha
      const senhaHash = await bcrypt.hash(senha, 10);

      // Insere no banco
      const [result] = await db.query(
        "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
        [nome, email, senhaHash]
      );

      return res.status(201).json({
        status: "ok",
        message: "Usuário criado com sucesso.",
        data: {
          id: result.insertId,
          nome,
          email
        }
      });

    } catch (err) {
      console.error("Erro em usuarios.store:", err);
      return res.status(500).json({
        status: "erro",
        message: "Erro ao criar usuário."
      });
    }
  },

  // PUT /usuarios/:id
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;

      // Verifica se o usuário existe
      const [exists] = await db.query(
        "SELECT id FROM usuarios WHERE id = ?",
        [id]
      );

      if (exists.length === 0) {
        return res.status(404).json({
          status: "erro",
          message: "Usuário não encontrado."
        });
      }

      // Atualiza
      await db.query(
        "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?",
        [nome, email, id]
      );

      return res.json({
        status: "ok",
        message: "Usuário atualizado com sucesso.",
        data: { id, nome, email }
      });

    } catch (err) {
      console.error("Erro em usuarios.update:", err);
      return res.status(500).json({
        status: "erro",
        message: "Erro ao atualizar usuário."
      });
    }
  },

  // DELETE /usuarios/:id
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const [exists] = await db.query(
        "SELECT id FROM usuarios WHERE id = ?",
        [id]
      );

      if (exists.length === 0) {
        return res.status(404).json({
          status: "erro",
          message: "Usuário não encontrado."
        });
      }

      await db.query("DELETE FROM usuarios WHERE id = ?", [id]);

      return res.json({
        status: "ok",
        message: "Usuário removido com sucesso."
      });

    } catch (err) {
      console.error("Erro em usuarios.destroy:", err);
      return res.status(500).json({
        status: "erro",
        message: "Erro ao remover usuário."
      });
    }
  }

};
