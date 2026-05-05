import express from 'express';

export const healthRouter = express.Router();

healthRouter.get('/', async (req, res) => {
  const checks: Record<string, string> = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    memory: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
    node: process.version,
    env: process.env.NODE_ENV || 'development',
  };

  // DB check
  if (process.env.DATABASE_URL) {
    try {
      const { query } = await import('../../src/lib/db.mjs');
      await query('SELECT 1');
      checks.db = 'ok';
    } catch (err: any) {
      checks.db = `error: ${err.message}`;
      return res.status(503).json({ ...checks, status: 'degraded' });
    }
  } else {
    checks.db = 'json-fallback';
  }

  res.status(200).json(checks);
});
