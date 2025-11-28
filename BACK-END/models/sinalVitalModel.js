const db = require("../config/database");

module.exports = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM sinal_vital");
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM sinal_vital WHERE id_checagem = ?", [id]);
    return rows[0];
  },

  async create(data) {
    const { idoso_id, tipo, valor, data_hora, observacoes } = data;

    const [result] = await db.query(
      `INSERT INTO sinal_vital 
       (idoso_id, tipo, valor, data_hora, observacoes)
       VALUES (?, ?, ?, ?, ?)`,
      [idoso_id, tipo, valor, data_hora, observacoes]
    );

    return { id: result.insertId, ...data };
  }
};
