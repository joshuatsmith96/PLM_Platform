const express = require("express");
const stageController = require("../controllers/stageController");

const router = express.Router();

router.post("/", stageController.createStageDetail);
router.patch("/:id", stageController.updateStageDetail);

module.exports = router;
