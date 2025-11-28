const express = require("express");
const router = express.Router();

const administracaoController = require("../controllers/administracaoController");

// Listar administrações
router.get("/", administracaoController.index);

// Ver 1 administração
router.get("/:id", administracaoController.show);

// Registrar administração
router.post("/", administracaoController.store);

// Atualizar
router.put("/:id", administracaoController.update);

// Remover
router.delete("/:id", administracaoController.destroy);

module.exports = router;
