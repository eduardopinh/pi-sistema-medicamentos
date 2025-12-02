const db = require("../config/database");

module.exports = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM alerta");
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM alerta WHERE id_aviso = ?", [id]);
    return rows[0];
  },

  async create(data) {
    const { tipo, mensagem, prioridade, idoso_id, medicamento_id } = data;

    const [result] = await db.query(
      `INSERT INTO alerta 
       (tipo, mensagem, prioridade, idoso_id, medicamento_id)
       VALUES (?, ?, ?, ?, ?)`,
      [tipo, mensagem, prioridade, idoso_id, medicamento_id]
    );

    return { id: result.insertId, ...data };
  }
};
