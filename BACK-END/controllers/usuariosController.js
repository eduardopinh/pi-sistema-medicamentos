module.exports = {
  
  // GET /usuarios
  index(req, res) {
    const mock = [
      { id: 1, nome: "Maria", email: "maria@email.com" },
      { id: 2, nome: "João", email: "joao@email.com" }
    ];

    res.json({
      status: "ok",
      data: mock
    });
  },

  // GET /usuarios/:id
  show(req, res) {
    const { id } = req.params;

    const mockUser = {
      id,
      nome: "Usuário Exemplo",
      email: "exemplo@email.com"
    };

    res.json({
      status: "ok",
      data: mockUser
    });
  },

  // POST /usuarios
  store(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        status: "erro",
        message: "Envie nome, email e senha."
      });
    }

    const novoUsuario = {
      id: Math.floor(Math.random() * 9999),
      nome,
      email
    };

    res.status(201).json({
      status: "ok",
      message: "Usuário criado (mock).",
      data: novoUsuario
    });
  },

  // PUT /usuarios/:id
  update(req, res) {
    const { id } = req.params;
    const { nome, email } = req.body;

    res.json({
      status: "ok",
      message: "Usuário atualizado (mock).",
      data: {
        id,
        nome: nome || "Nome antigo",
        email: email || "email@antigo.com"
      }
    });
  },

  // DELETE /usuarios/:id
  destroy(req, res) {
    const { id } = req.params;

    res.json({
      status: "ok",
      message: `Usuário ${id} removido (mock).`
    });
  }

};
