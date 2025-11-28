const express = require("express");
const router = express.Router();

const idosoController = require("../controllers/idosoController");

router.get("/", idosoController.index);
router.get("/:id", idosoController.show);
router.post("/", idosoController.store);
router.put("/:id", idosoController.update);
router.delete("/:id", idosoController.destroy);

module.exports = router;
