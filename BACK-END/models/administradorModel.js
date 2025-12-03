const db = require("../config/database");

module.exports = {
  // Buscar todos os administradores
  async findAll() {
    const [rows] = await db.query("SELECT id_adm, nome, email FROM administrador");
    return rows;
  },

  // Buscar por ID
  async findById(id) {
    const [rows] = await db.query(
      "SELECT id_adm, nome, email FROM administrador WHERE id_adm = ?",
      [id]
    );
    return rows[0] || null;
  },

  // Buscar por e-mail
  async findByEmail(email) {
    const [rows] = await db.query(
      "SELECT * FROM administrador WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  },

  // Criar administrador
  async create(nome, email, senhaHash) {
    const [result] = await db.query(
      "INSERT INTO administrador (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senhaHash]
    );

    return {
      id_adm: result.insertId,
      nome,
      email
    };
  },

  // Atualizar administrador
  async update(id, nome, email) {
    const [result] = await db.query(
      "UPDATE administrador SET nome = ?, email = ? WHERE id_adm = ?",
      [nome, email, id]
    );

    return result.affectedRows;
  },

  // Remover administrador
  async delete(id) {
    const [result] = await db.query(
      "DELETE FROM administrador WHERE id_adm = ?",
      [id]
    );

    return result.affectedRows;
  }
};
