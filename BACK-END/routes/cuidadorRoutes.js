const express = require("express");
const router = express.Router();

const cuidadorController = require("../controllers/cuidadorController.js");
const authMiddleware = require("../middlewares/authMiddleware");

// Todas as rotas protegidas
router.get("/", authMiddleware, cuidadorController.index);
router.get("/:id", authMiddleware, cuidadorController.show);
router.post("/", authMiddleware, cuidadorController.store);
router.put("/:id", authMiddleware, cuidadorController.update);
router.delete("/:id", authMiddleware, cuidadorController.destroy);

module.exports = router;
