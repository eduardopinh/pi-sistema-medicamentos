const express = require("express");
const router = express.Router();

const doencaController = require("../controllers/doencaController");

router.get("/", doencaController.index);
router.get("/:id", doencaController.show);
router.post("/", doencaController.store);
router.put("/:id", doencaController.update);
router.delete("/:id", doencaController.destroy);

module.exports = router;
