const express = require("express");
const router = express.Router();

const medicamentoController = require("../controllers/medicamentoController");

router.get("/", medicamentoController.index);
router.get("/:id", medicamentoController.show);
router.post("/", medicamentoController.store);
router.put("/:id", medicamentoController.update);
router.delete("/:id", medicamentoController.destroy);

module.exports = router;
