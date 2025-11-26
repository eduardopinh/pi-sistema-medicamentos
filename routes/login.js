const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuariosController");

// rotas
router.get("/", (req, res) => res.redirect("/login"));

router.get("/login", usuarioController.showLogin);
router.post("/login", usuarioController.login);

router.get("/home", usuarioController.home);

router.post("/logout", usuarioController.logout);

module.exports = router;
