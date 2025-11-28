const db = require("../config/database");

module.exports = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM consulta");
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM consulta WHERE id_orientacao = ?", [id]);
    return rows[0];
  },

  async create(data) {
    const { idoso_id, especialidade, medico, local_consulta, data_hora, status_consulta } = data;

    const [result] = await db.query(
      `INSERT INTO consulta 
       (idoso_id, especialidade, medico, local_consulta, data_hora, status_consulta)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [idoso_id, especialidade, medico, local_consulta, data_hora, status_consulta]
    );

    return { id: result.insertId, ...data };
  }
};
