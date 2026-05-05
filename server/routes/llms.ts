import express from 'express';
import { buildLlmsTxt, buildLlmsFullTxt } from '../../src/lib/aeo.mjs';

export const llmsRouter = express.Router();

llmsRouter.get('/', async (req, res) => {
  res.type('text/markdown').send(await buildLlmsTxt());
});

llmsRouter.get('/llms-full.txt', async (req, res) => {
  res.type('text/plain').send(await buildLlmsFullTxt());
});
