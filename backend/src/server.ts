import app from './app';
import dotenv from 'dotenv';
import { pool } from './db';
import { redis } from './services/redis.service';

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  console.log("Starting server process...");
  try {
    console.log("Connecting to postgres...");
    await pool.query('SELECT 1');
    console.log("Postgres OK. Connecting to Redis...");
    await redis.ping();
    console.log("Redis OK. Starting Express...");
    app.listen(Number(PORT), '0.0.0.0', () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
