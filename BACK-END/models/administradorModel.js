const db = require("../config/database");

module.exports = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM administrador");
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM administrador WHERE id_adm = ?", [id]);
    return rows[0];
  },

  async create(data) {
    const { nome, email, senha } = data;
    const [result] = await db.query(
      "INSERT INTO administrador (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha]
    );
    return { id: result.insertId, ...data };
  }
};
