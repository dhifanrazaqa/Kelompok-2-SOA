/**
 * Middleware to initialize and configure Redis connection using ioredis
 * @module redis
 * @requires ioredis
 *
 * @event connect - Event triggered when successfully connected to Redis
 * @event error - Event triggered when a Redis connection error occurs
 * 
 * @return {Redis} redis - Redis instance used for caching and temporary data storage operations
 */
const Redis = require("ioredis");
const logger = require("./logger");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: process.env.REDIS_DB,
});

redis.on("connect", () => {
  logger.info("Connected to redis");
});

redis.on("error", (err) => {
  logger.error("Redis Error", err);
});

module.exports = redis;
