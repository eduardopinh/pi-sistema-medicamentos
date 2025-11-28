const db = require("../config/database");

module.exports = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM medicamento");
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM medicamento WHERE id_remedio = ?", [id]);
    return rows[0];
  },

  async create(data) {
    const { nome, especialidade, quantidade_inicial, especificacoes, classificacao, idoso_id, doenca_id } = data;

    const [result] = await db.query(
      `INSERT INTO medicamento 
       (nome, especialidade, quantidade_inicial, especificacoes, classificacao, idoso_id, doenca_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, especialidade, quantidade_inicial, especificacoes, classificacao, idoso_id, doenca_id]
    );

    return { id: result.insertId, ...data };
  }
};
