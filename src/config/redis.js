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
