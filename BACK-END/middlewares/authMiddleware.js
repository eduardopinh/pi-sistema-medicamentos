const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "erro",
        message: "Token não fornecido."
      });
    }

    const token = authHeader.split(" ")[1]; // Formato esperado: "Bearer token"

    if (!token) {
      return res.status(401).json({
        status: "erro",
        message: "Token inválido."
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Dados do usuário agora podem ser usados no controller
    req.user = decoded;

    next();

  } catch (err) {
    console.error("Erro no authMiddleware:", err);

    return res.status(401).json({
      status: "erro",
      message: "Token expirado ou inválido."
    });
  }
};
