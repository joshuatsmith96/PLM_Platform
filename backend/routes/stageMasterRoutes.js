const express = require("express");
const router = express.Router();
const stageMasterController = require("../controllers/stageMasterController");

router.get("/", stageMasterController.getAllStages);

module.exports = router;
