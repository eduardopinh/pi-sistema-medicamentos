const db = require("../config/database");

module.exports = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM relatorio");
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(
      "SELECT * FROM relatorio WHERE id_descricao = ?",
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const { tipo, arquivo, id_idoso, id_sinal_vital } = data;

    const [result] = await db.query(
      `INSERT INTO relatorio 
       (tipo, arquivo, id_idoso, id_sinal_vital)
       VALUES (?, ?, ?, ?)`,
      [tipo, arquivo, id_idoso, id_sinal_vital]
    );

    return { id: result.insertId, ...data };
  }
};
