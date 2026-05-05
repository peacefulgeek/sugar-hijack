import express from 'express';
import { ASSESSMENTS } from '../../src/data/assessments.js';

export const assessmentsRouter = express.Router();

assessmentsRouter.get('/', (req, res) => {
  res.json({
    assessments: ASSESSMENTS.map(a => ({
      slug: a.slug,
      title: a.title,
      description: a.description,
    })),
  });
});

assessmentsRouter.get('/:slug', (req, res) => {
  const assessment = ASSESSMENTS.find(a => a.slug === req.params.slug);
  if (!assessment) return res.status(404).json({ error: 'Assessment not found' });
  res.json({ assessment });
});
