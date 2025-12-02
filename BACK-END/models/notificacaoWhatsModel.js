const db = require("../config/database");

module.exports = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM notificacao_whats");
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(
      "SELECT * FROM notificacao_whats WHERE id_notifica = ?",
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const {
      destinatario_tipo,
      texto,
      status_notificacao,
      id_cuid,
      id_motora
    } = data;

    const [result] = await db.query(
      `INSERT INTO notificacao_whats 
       (destinatario_tipo, texto, status_notificacao, id_cuid, id_motora)
       VALUES (?, ?, ?, ?, ?)`,
      [destinatario_tipo, texto, status_notificacao, id_cuid, id_motora]
    );

    return { id: result.insertId, ...data };
  }
};
