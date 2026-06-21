const redis = require("redis");

(async () => {
  try {
    const client = redis.createClient({
      socket: {
        host: "127.0.0.1",
        port: 6379,
      },
    });

    client.on("error", (err) => {
      console.error("Redis Error:", err);
    });

    await client.connect();

    console.log("✅ Connected to Redis");

    await client.set("hello", "world");

    const value = await client.get("hello");

    console.log("Value:", value);

    await client.quit();

    console.log("✅ Success");
  } catch (err) {
    console.error(err);
  }
})();