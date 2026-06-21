const express = require("express");

const router = express.Router();

const redisClient = require("../redis/redisClient");

router.get("/", async (req, res) => {
  try {

    const trending =
      await redisClient.zRangeWithScores(
        "query_counts",
        0,
        9,
        {
          REV: true
        }
      );

    res.json({
      success: true,
      count: trending.length,
      data: trending
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch trending searches"
    });

  }
});

module.exports = router;