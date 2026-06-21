const express = require("express");

const router = express.Router();

const {
  getNode,
} = require("../cache/consistentHash");

router.get("/debug", (req, res) => {
  const prefix = req.query.prefix || "";

  const node = getNode(prefix);

  res.json({
    prefix,
    assignedNode: node,
  });
});

module.exports = router;