const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Registro
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

// Usuário autenticado
router.get("/me", authMiddleware, authController.me);

module.exports = router;
