const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// IMPORTAR BANCO (agora funciona)
const db = require("../config/database");

module.exports = {

  // ==========================================
  // POST /auth/register
  // ==========================================
  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({
          status: "erro",
          message: "Nome, email e senha são obrigatórios."
        });
      }

      // Verifica email
      const [userExists] = await db.query(
        "SELECT * FROM administrador WHERE email = ?",
        [email]
      );

      if (userExists.length > 0) {
        return res.status(409).json({
          status: "erro",
          message: "Este email já está cadastrado."
        });
      }

      // Hash da senha
      const senhaHash = await bcrypt.hash(senha, 10);

      // Inserir administrador
      const [result] = await db.query(
        "INSERT INTO administrador (nome, email, senha) VALUES (?, ?, ?)",
        [nome, email, senhaHash]
      );

      return res.status(201).json({
        status: "ok",
        message: "Administrador registrado com sucesso!",
        user: {
          id_adm: result.insertId,
          nome,
          email
        }
      });

    } catch (err) {
      console.error("Erro em register:", err);
      return res.status(500).json({
        status: "erro",
        message: "Erro interno no servidor."
      });
    }
  },

  // ==========================================
  // POST /auth/login
  // ==========================================
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({
          status: "erro",
          message: "Email e senha são obrigatórios."
        });
      }

      // Buscar no banco
      const [rows] = await db.query(
        "SELECT * FROM administrador WHERE email = ?",
        [email]
      );

      if (rows.length === 0) {
        return res.status(404).json({
          status: "erro",
          message: "Administrador não encontrado."
        });
      }

      const admin = rows[0];

      // Verificar senha
      const senhaConfere = await bcrypt.compare(senha, admin.senha);

      if (!senhaConfere) {
        return res.status(401).json({
          status: "erro",
          message: "Senha incorreta."
        });
      }

      // Criar tokenx'
      const token = jwt.sign(
        {
          id_adm: admin.id_adm,
          nome: admin.nome,
          email: admin.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      return res.json({
        status: "ok",
        message: "Login realizado com sucesso.",
        token,
        user: {
          id_adm: admin.id_adm,
          nome: admin.nome,
          email: admin.email
        }
      });

    } catch (err) {
      console.error("Erro em login:", err);
      return res.status(500).json({
        status: "erro",
        message: "Erro interno no servidor."
      });
    }
  },

  // ==========================================
  // GET /auth/me
  // ==========================================
  async me(req, res) {
    try {
      return res.json({
        status: "ok",
        user: req.user
      });

    } catch (err) {
      console.error("Erro em me:", err);
      return res.status(500).json({
        status: "erro",
        message: "Erro interno no servidor."
      });
    }
  }
};
