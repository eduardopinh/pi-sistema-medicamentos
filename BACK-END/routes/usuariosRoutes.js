const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuariosController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rotas protegidas pelo middleware de autenticação
router.get("/", authMiddleware, usuariosController.index);
router.get("/:id", authMiddleware, usuariosController.show);
router.post("/", authMiddleware, usuariosController.store);
router.put("/:id", authMiddleware, usuariosController.update);
router.delete("/:id", authMiddleware, usuariosController.destroy);

module.exports = router;
