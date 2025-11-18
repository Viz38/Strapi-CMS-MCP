require('dotenv').config();

const config = {
  strapiUrl: process.env.STRAPI_URL,
  strapiApiToken: process.env.STRAPI_API_TOKEN,
};

module.exports = config;
