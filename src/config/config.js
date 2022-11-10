require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL || '';

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1717;
const NODE_ENV = process.env.NODE_ENV || 'production';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';

module.exports = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT,
    env: NODE_ENV
  },
  token: {
    secret: JWT_SECRET_KEY
  }
};
