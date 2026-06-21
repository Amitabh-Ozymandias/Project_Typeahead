require("dotenv").config();

const path = require("path");

const Trie = require("./tries/Trie");
const loadDataset = require("./services/datasetLoader");
const createApp = require("./app");

const redisClient = require("./redis/redisClient");
const loadQueriesToRedis = require("./services/redisLoader");

const {
  flushBuffer
} = require("./services/batchWriter");

(async () => {
  try {

    // Connect Redis
    await redisClient.connect();

    // Flush search buffer every 5 seconds
    setInterval(() => {
      flushBuffer(redisClient);
    }, 5000);

    const trie = new Trie();

    const datasetPath = path.join(
      __dirname,
      "../dataset/queries.csv"
    );

    // Load CSV into memory
    const queries = await loadDataset(
      datasetPath,
      trie
    );

    // Load into Redis Sorted Set
    await loadQueriesToRedis(
      redisClient,
      queries
    );

    const app = createApp(trie);

    app.listen(process.env.PORT, () => {
      console.log(
        `🚀 Server running on port ${process.env.PORT}`
      );
    });

  } catch (err) {
    console.error("Startup Error:", err);
  }
})();