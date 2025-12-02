const db = require("../config/database");

module.exports = {
  async findAll() {
    const [rows] = await db.query(`
      SELECT c.*, t.telefone 
      FROM cuidador c 
      LEFT JOIN telefone_cuidador t ON c.id_cuid = t.id_cuid
    `);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM cuidador WHERE id_cuid = ?", [id]);
    return rows[0];
  },

  async create(data) {
    const { nome, cpf, telefone } = data;

    const [result] = await db.query(
      "INSERT INTO cuidador (nome, cpf) VALUES (?, ?)",
      [nome, cpf]
    );

    if (telefone) {
      await db.query(
        "INSERT INTO telefone_cuidador (telefone, id_cuid) VALUES (?, ?)",
        [telefone, result.insertId]
      );
    }

    return { id: result.insertId, nome, cpf, telefone };
  }
};
