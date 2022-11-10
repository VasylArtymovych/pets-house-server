require('dotenv').config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@db.rezcmsh.mongodb.net`;

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
