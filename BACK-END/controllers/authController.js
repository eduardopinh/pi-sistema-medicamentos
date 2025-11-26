const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Quando o banco estiver pronto, descomente:
// const db = require("../config/database");

module.exports = {

  // ============================================
  //  POST /auth/register
  // ============================================
  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({
          status: "erro",
          message: "Nome, email e senha são obrigatórios."
        });
      }

      // ==== VERIFICAÇÃO DE E-MAIL (ativado quando houver DB) ====
      //
      // const [userExists] = await db.query(
      //   "SELECT id FROM usuarios WHERE email = ?",
      //   [email]
      // );
      //
      // if (userExists.length > 0) {
      //   return res.status(409).json({
      //     status: "erro",
      //     message: "Este email já está cadastrado."
      //   });
      // }

      // ==== CRIAR HASH DA SENHA ====
      const senhaHash = await bcrypt.hash(senha, 10);

      // ==== SALVAR NO BANCO (ativar quando DB existir) ====
      //
      // const [result] = await db.query(
      //   "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      //   [nome, email, senhaHash]
      // );
      //
      // const novoUsuario = {
      //   id: result.insertId,
      //   nome,
      //   email
      // };

      // ======== Sem DB ainda: retorno neutro ========
      const novoUsuario = {
        id: 0, // será substituído pelo insertId real
        nome,
        email
      };

      return res.status(201).json({
        status: "ok",
        message: "Usuário registrado com sucesso (aguardando DB).",
        user: novoUsuario
      });

    } catch (err) {
      console.error("Erro em register:", err);
      return res.status(500).json({
        status: "erro",
        message: "Erro interno no servidor."
      });
    }
  },

  // ============================================
  //  POST /auth/login
  // ============================================
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({
          status: "erro",
          message: "Email e senha são obrigatórios."
        });
      }

      // ==== BUSCAR USUÁRIO NO BANCO (ativar depois) ====
      //
      // const [rows] = await db.query(
      //   "SELECT * FROM usuarios WHERE email = ?",
      //   [email]
      // );
      //
      // if (rows.length === 0) {
      //   return res.status(404).json({
      //     status: "erro",
      //     message: "Usuário não encontrado."
      //   });
      // }
      //
      // const usuario = rows[0];

      // ======== Sem DB ainda: usuário inexistente ========
      return res.status(404).json({
        status: "erro",
        message: "Usuário não encontrado (aguardando DB)."
      });

      // ==== QUANDO O BANCO EXISTIR, ATIVE AQUI ====
      //
      // const senhaConfere = await bcrypt.compare(senha, usuario.senha);
      // if (!senhaConfere) {
      //   return res.status(401).json({
      //     status: "erro",
      //     message: "Senha incorreta."
      //   });
      // }
      //
      // const token = jwt.sign(
      //   {
      //     id: usuario.id,
      //     nome: usuario.nome,
      //     email: usuario.email
      //   },
      //   process.env.JWT_SECRET,
      //   { expiresIn: "8h" }
      // );
      //
      // return res.json({
      //   status: "ok",
      //   message: "Login realizado com sucesso.",
      //   token,
      //   user: {
      //     id: usuario.id,
      //     nome: usuario.nome,
      //     email: usuario.email
      //   }
      // });

    } catch (err) {
      console.error("Erro em login:", err);
      return res.status(500).json({
        status: "erro",
        message: "Erro interno no servidor."
      });
    }
  },

  // ============================================
  //  GET /auth/me (precisa do middleware)
  // ============================================
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
