const db = require("../config/database");

module.exports = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM familiar");
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM familiar WHERE id_parente = ?", [id]);
    return rows[0];
  },

  async create(data) {
    const { nome, id_usuario } = data;

    const [result] = await db.query(
      "INSERT INTO familiar (nome, id_usuario) VALUES (?, ?)",
      [nome, id_usuario]
    );

    return { id: result.insertId, ...data };
  }
};
