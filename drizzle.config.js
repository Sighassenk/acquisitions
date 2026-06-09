import 'dotenv/config';

export default {
  schema:'./src/models/*.js',
  out:'./drizzle',
  dialect: 'postgresql',
  dbCredentials:{
    url: process.env.DATA_BASE_URL,
  }
};