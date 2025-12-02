const db = require("../config/database");

module.exports = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM idoso");
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM idoso WHERE id_usuario = ?", [id]);
    return rows[0];
  },

  async create(data) {
    const { nome, genero, data_nascimento, contatos_emergencia, historico_clinico, id_adm } = data;

    const [result] = await db.query(
      `INSERT INTO idoso 
       (nome, genero, data_nascimento, contatos_emergencia, historico_clinico, id_adm) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, genero, data_nascimento, contatos_emergencia, historico_clinico, id_adm]
    );

    return { id: result.insertId, ...data };
  }
};
