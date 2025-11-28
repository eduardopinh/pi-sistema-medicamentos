const express = require("express");
const router = express.Router();

const horarioMedicamentoController = require("../controllers/horarioMedicamentoController");

router.get("/", horarioMedicamentoController.index);

// horários por medicamento
router.get("/medicamento/:id", horarioMedicamentoController.show);

router.post("/", horarioMedicamentoController.store);
router.put("/:id", horarioMedicamentoController.update);
router.delete("/:id", horarioMedicamentoController.destroy);

module.exports = router;
