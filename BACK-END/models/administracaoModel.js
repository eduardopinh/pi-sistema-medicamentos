const db = require("../config/database");

module.exports = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM administracao");
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(
      "SELECT * FROM administracao WHERE id_direcao = ?",
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const { horario_administrado, tipo, medicamento_id, cuidador_id } = data;

    const [result] = await db.query(
      `INSERT INTO administracao 
       (horario_administrado, tipo, medicamento_id, cuidador_id)
       VALUES (?, ?, ?, ?)`,
      [horario_administrado, tipo, medicamento_id, cuidador_id]
    );

    return { id: result.insertId, ...data };
  }
};
