/**
 * Module to configure and export an instance of Cloudinary.
 * @module cloudinary
 * 
 * @return {object} cloudinary - Configured Cloudinary instance for managing media assets.
 */
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
