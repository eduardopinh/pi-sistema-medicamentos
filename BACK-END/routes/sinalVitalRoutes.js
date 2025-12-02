const express = require("express");
const router = express.Router();

const sinalVitalController = require("../controllers/sinalVitalController");

router.get("/", sinalVitalController.index);
router.get("/:id", sinalVitalController.show);
router.post("/", sinalVitalController.store);
router.put("/:id", sinalVitalController.update);
router.delete("/:id", sinalVitalController.destroy);

module.exports = router;
