const express = require("express");
const router = express.Router();

const consultaController = require("../controllers/consultaController");

router.get("/", consultaController.index);
router.get("/:id", consultaController.show);
router.post("/", consultaController.store);
router.put("/:id", consultaController.update);
router.delete("/:id", consultaController.destroy);

module.exports = router;
