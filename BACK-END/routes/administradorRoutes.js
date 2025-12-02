const express = require("express");
const router = express.Router();

const administradorController = require("../controllers/administradorController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rotas protegidas
router.get("/", authMiddleware, administradorController.index);
router.get("/:id", authMiddleware, administradorController.show);
router.post("/", authMiddleware, administradorController.store);
router.put("/:id", authMiddleware, administradorController.update);
router.delete("/:id", authMiddleware, administradorController.destroy);

module.exports = router;
