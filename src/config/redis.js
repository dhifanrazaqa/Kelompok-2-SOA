const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: process.env.REDIS_DB,
});

redis.on("connect", () => {
  console.log("Connected to redis");
});

redis.on("error", (err) => {
  console.log("Redis Error", err);
});

module.exports = redis;
