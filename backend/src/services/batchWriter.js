const buffer = {};

function recordSearch(query) {
  buffer[query] = (buffer[query] || 0) + 1;
}

async function flushBuffer(redisClient) {

  const entries = Object.entries(buffer);

  if (entries.length === 0) {
    return;
  }

  for (const [query, count] of entries) {
    await redisClient.zIncrBy(
      "query_counts",
      count,
      query
    );
  }

  Object.keys(buffer).forEach(
    key => delete buffer[key]
  );

  console.log(
    `Flushed ${entries.length} searches`
  );
}

module.exports = {
  recordSearch,
  flushBuffer
};