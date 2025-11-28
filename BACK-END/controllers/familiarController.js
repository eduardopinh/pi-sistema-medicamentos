const db = require("../config/database");

module.exports = {
  // GET /familiar
  // Lista todos os familiares
  async index(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM familiar");

      return res.json({
        status: "ok",
        data: rows
      });

    } catch (error) {
      console.error("Erro em familiar.index:", error);
      return res.status(500).json({
        status: "erro",
        message: "Erro ao buscar familiares."
      });
    }
  },

  // GET /familiar/:id
  // Mostra um familiar específico
  async show(req, res) {
    try {
      const { id } = req.params;

      const [rows] = await db.query(
        "SELECT * FROM familiar WHERE id_parente = ?",
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).json({
          status: "erro",
          message: "Familiar não encontrado."
        });
      }

      return res.json({
        status: "ok",
        data: rows[0]
      });

    } catch (error) {
      console.error("Erro em familiar.show:", error);
      return res.status(500).json({
        status: "erro",
        message: "Erro ao buscar familiar."
      });
    }
  },

  // POST /familiar
  // Cria um novo familiar
  async store(req, res) {
    try {
      const { nome, id_usuario } = req.body;

      if (!nome || !id_usuario) {
        return res.status(400).json({
          status: "erro",
          message: "Nome e id_usuario são obrigatórios."
        });
      }

      const [result] = await db.query(
        "INSERT INTO familiar (nome, id_usuario) VALUES (?, ?)",
        [nome, id_usuario]
      );

      return res.status(201).json({
        status: "ok",
        message: "Familiar criado com sucesso.",
        data: {
          id_parente: result.insertId,
          nome,
          id_usuario
        }
      });

    } catch (error) {
      console.error("Erro em familiar.store:", error);
      return res.status(500).json({
        status: "erro",
        message: "Erro ao criar familiar."
      });
    }
  },

  // PUT /familiar/:id
  // Atualiza um familiar
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, id_usuario } = req.body;

      const [result] = await db.query(
        `
        UPDATE familiar
        SET nome = ?, id_usuario = ?
        WHERE id_parente = ?
        `,
        [nome, id_usuario, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "erro",
          message: "Familiar não encontrado."
        });
      }

      return res.json({
        status: "ok",
        message: "Familiar atualizado com sucesso.",
        data: { id_parente: id, nome, id_usuario }
      });

    } catch (error) {
      console.error("Erro em familiar.update:", error);
      return res.status(500).json({
        status: "erro",
        message: "Erro ao atualizar familiar."
      });
    }
  },

  // DELETE /familiar/:id
  // Remove um familiar
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const [result] = await db.query(
        "DELETE FROM familiar WHERE id_parente = ?",
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "erro",
          message: "Familiar não encontrado."
        });
      }

      return res.json({
        status: "ok",
        message: "Familiar removido com sucesso."
      });

    } catch (error) {
      console.error("Erro em familiar.destroy:", error);
      return res.status(500).json({
        status: "erro",
        message: "Erro ao remover familiar."
      });
    }
  }
};
