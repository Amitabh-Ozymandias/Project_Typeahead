const redisClient = require("./src/redis/redisClient");

(async () => {
  try {

    await redisClient.connect();

    const top = await redisClient.zRangeWithScores(
      "query_counts",
      0,
      10,
      { REV: true }
    );

    console.log(top);

    await redisClient.quit();

  } catch (err) {
    console.error(err);
  }
})();