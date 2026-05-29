import { journalists, articles } from '../models/data.js';

// GET /journalists
export const getJournalists = (req, res) => {
  res.json({
    message: 'Get all journalists successfully',
    count: journalists.length,
    data: journalists,
  });
};

// GET /journalists/:id
export const getJournalist = (req, res) => {
  const id = parseInt(req.params.id);
  const journalist = journalists.find(j => j.id === id);

  if (!journalist) {
    return res.status(404).json({ error: 'Journalist not found' });
  }

  // Include their articles
  const theirArticles = articles.filter(a => a.journalistId === id);

  res.json({
    message: 'Get journalist successfully',
    data: { ...journalist, articles: theirArticles },
  });
};
