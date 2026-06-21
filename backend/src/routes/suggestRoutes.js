const express = require("express");

const cache = require("../cache/suggestionCache");

const {
  recordHit,
  recordMiss,
} = require("../cache/cacheMetrics");

module.exports = (trie) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    const prefix =
      (req.query.q || "").toLowerCase();

    if (!prefix) {
      return res.json([]);
    }

    if (cache.has(prefix)) {

      recordHit();

      return res.json(
        cache.get(prefix)
      );
    }

    recordMiss();

    const suggestions =
      trie.search(prefix);

    cache.set(
      prefix,
      suggestions
    );

    res.json(suggestions);
  });

  return router;
};