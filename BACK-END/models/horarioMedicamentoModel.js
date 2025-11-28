const db = require("../config/database");

module.exports = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM horario_medicamento");
    return rows;
  },

  async findByMedicamento(medicamento_id) {
    const [rows] = await db.query(
      "SELECT * FROM horario_medicamento WHERE medicamento_id = ?",
      [medicamento_id]
    );
    return rows;
  },

  async create(data) {
    const { horario, medicamento_id } = data;

    const [result] = await db.query(
      "INSERT INTO horario_medicamento (horario, medicamento_id) VALUES (?, ?)",
      [horario, medicamento_id]
    );

    return { id: result.insertId, ...data };
  }
};
