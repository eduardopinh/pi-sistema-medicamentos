const express = require("express");
const router = express.Router();
const controller = require("../controllers/idosoController");
const upload = require("../config/multerIdoso");

// Criar idoso
router.post("/", upload.single("foto"), controller.create);

// Atualizar idoso
router.put("/:id", upload.single("foto"), controller.update);

// Listar todos
router.get("/", controller.getAll);

// Buscar um idoso
router.get("/:id", controller.getById);

// Deletar
router.delete("/:id", controller.delete);

module.exports = router;
