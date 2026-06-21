const express = require("express");

const router = express.Router();

const {
  getMetrics,
} = require("../cache/cacheMetrics");

router.get("/", (req, res) => {
  res.json(getMetrics());
});

module.exports = router;