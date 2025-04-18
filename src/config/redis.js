/**
 * Middleware untuk menginisialisasi dan mengonfigurasi koneksi Redis menggunakan ioredis
 * @module redis
 * @requires ioredis
 *
 * @const {Redis} redis - Instance Redis yang digunakan untuk operasi cache dan penyimpanan data sementara
 * 
 * @event connect - Event yang dipicu saat berhasil terkoneksi ke Redis
 * @event error - Event yang dipicu saat terjadi kesalahan koneksi Redis
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
