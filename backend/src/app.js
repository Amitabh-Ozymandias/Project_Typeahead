const express = require("express");
const cors = require("cors");

function createApp(trie) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Suggest API
  app.use(
    "/suggest",
    require("./routes/suggestRoutes")(trie)
  );

  // Search API
  app.use(
    "/search",
    require("./routes/searchRoutes")
  );

  // Trending API
  app.use(
    "/trending",
    require("./routes/trendingRoutes")
  );

  // Cache Debug API
  app.use(
    "/cache",
    require("./routes/cacheRoutes")
  );

  // Metrics API
  app.use(
    "/metrics",
    require("./routes/metricsRoutes")
  );

  app.get("/", (req, res) => {
    res.send(
      "Typeahead Search Backend Running"
    );
  });

  return app;
}

module.exports = createApp;