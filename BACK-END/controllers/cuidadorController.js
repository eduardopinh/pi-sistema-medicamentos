const db = require("../config/database");

module.exports = {
  // GET /cuidadores
  // Lista todos os cuidadores
  async index(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM cuidador");
      return res.json({
        status: "ok",
        data: rows
      });
    } catch (error) {
      console.error("Erro em cuidador.index:", error);
      return res.status(500).json({
        status: "erro",
        message: "Erro ao buscar cuidadores."
      });
    }
  },

  // GET /cuidadores/:id
  // Mostra um cuidador específico
  async show(req, res) {
    try {
      const { id } = req.params;

      const [rows] = await db.query(
        "SELECT * FROM cuidador WHERE id_cuid = ?",
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).json({
          status: "erro",
          message: "Cuidador não encontrado."
        });
      }

      return res.json({
        status: "ok",
        data: rows[0]
      });
    } catch (error) {
      console.error("Erro em cuidador.show:", error);
      return res.status(500).json({
        status: "erro",
        message: "Erro ao buscar cuidador."
      });
    }
  },

  // POST /cuidadores
  // Cria um novo cuidador
  async store(req, res) {
    try {
      const { nome, cpf, telefone } = req.body;

      if (!nome) {
        return res.status(400).json({
          status: "erro",
          message: "O nome é obrigatório."
        });
      }

      const [result] = await db.query(
        "INSERT INTO cuidador (nome, cpf, telefone) VALUES (?, ?, ?)",
        [nome, cpf || null, telefone || null]
      );

      return res.status(201).json({
        status: "ok",
        message: "Cuidador criado com sucesso.",
        data: {
          id: result.insertId,
          nome,
          cpf,
          telefone
        }
      });
    } catch (error) {
      console.error("Erro em cuidador.store:", error);
      return res.status(500).json({
        status: "erro",
        message: "Erro ao criar cuidador."
      });
    }
  },

  // PUT /cuidadores/:id
  // Atualiza um cuidador
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, cpf, telefone } = req.body;

      const [result] = await db.query(
        `
        UPDATE cuidador
        SET nome = ?, cpf = ?, telefone = ?
        WHERE id_cuid = ?
        `,
        [nome, cpf, telefone, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "erro",
          message: "Cuidador não encontrado."
        });
      }

      return res.json({
        status: "ok",
        message: "Cuidador atualizado com sucesso.",
        data: { id, nome, cpf, telefone }
      });
    } catch (error) {
      console.error("Erro em cuidador.update:", error);
      return res.status(500).json({
        status: "erro",
        message: "Erro ao atualizar cuidador."
      });
    }
  },

  // DELETE /cuidadores/:id
  // Remove um cuidador
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const [result] = await db.query(
        "DELETE FROM cuidador WHERE id_cuid = ?",
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "erro",
          message: "Cuidador não encontrado."
        });
      }

      return res.json({
        status: "ok",
        message: "Cuidador removido com sucesso."
      });
    } catch (error) {
      console.error("Erro em cuidador.destroy:", error);
      return res.status(500).json({
        status: "erro",
        message: "Erro ao remover cuidador."
      });
    }
  }
};
