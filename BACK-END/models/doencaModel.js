const db = require("../config/database");

module.exports = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM doenca");
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM doenca WHERE id_doenca = ?", [id]);
    return rows[0];
  },

  async create(data) {
    const { nome, data_diagnostico, medico_responsavel, especialidade, id_usuario } = data;

    const [result] = await db.query(
      `INSERT INTO doenca 
      (nome, data_diagnostico, medico_responsavel, especialidade, id_usuario)
      VALUES (?, ?, ?, ?, ?)`,
      [nome, data_diagnostico, medico_responsavel, especialidade, id_usuario]
    );

    return { id: result.insertId, ...data };
  }
};
