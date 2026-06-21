async function loadQueriesToRedis(client, queries) {

  const exists = await client.exists("query_counts");

  if (exists) {
    console.log("✅ Redis already populated");
    return;
  }

  console.log("📥 Loading queries into Redis...");

  for (const item of queries) {

    await client.zAdd("query_counts", {
      score: item.count,
      value: item.query
    });

  }

  console.log("✅ Redis population complete");
}

module.exports = loadQueriesToRedis;