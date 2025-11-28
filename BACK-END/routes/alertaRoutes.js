const express = require("express");
const router = express.Router();

const alertaController = require("../controllers/alertaController");

router.get("/", alertaController.index);
router.get("/:id", alertaController.show);
router.post("/", alertaController.store);
router.put("/:id", alertaController.update);
router.delete("/:id", alertaController.destroy);

module.exports = router;
