const express = require("express");

const router = express.Router();

const {
  recordSearch
} = require("../services/batchWriter");

router.post("/", (req, res) => {

  const { query } = req.body;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Query required"
    });
  }

  recordSearch(query);

  res.json({
    success: true,
    message: "Search recorded"
  });

});

module.exports = router;