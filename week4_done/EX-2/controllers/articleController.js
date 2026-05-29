import { articles, journalists, categories } from '../models/data.js';

// GET /articles
export const getArticles = (req, res) => {
  // Enrich each article with journalist and category info
  const enriched = articles.map(article => ({
    ...article,
    journalist: journalists.find(j => j.id === article.journalistId) || null,
    category: categories.find(c => c.id === article.categoryId) || null,
  }));

  res.json({
    message: 'Get all articles successfully',
    count: enriched.length,
    data: enriched,
  });
};

// GET /articles/:id
export const getArticle = (req, res) => {
  const id = parseInt(req.params.id);
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }

  res.json({
    message: 'Get article successfully',
    data: {
      ...article,
      journalist: journalists.find(j => j.id === article.journalistId) || null,
      category: categories.find(c => c.id === article.categoryId) || null,
    },
  });
};

// POST /articles
export const createArticle = (req, res) => {
  const { title, content, journalistId, categoryId } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'title and content are required' });
  }

  const newArticle = {
    id: articles.length + 1,
    title,
    content,
    journalistId: journalistId || null,
    categoryId: categoryId || null,
  };

  articles.push(newArticle);

  res.status(201).json({
    message: 'Article created successfully',
    data: newArticle,
  });
};

// PUT /articles/:id
export const updateArticle = (req, res) => {
  const id = parseInt(req.params.id);
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }

  const { title, content, journalistId, categoryId } = req.body;
  if (title) article.title = title;
  if (content) article.content = content;
  if (journalistId) article.journalistId = journalistId;
  if (categoryId) article.categoryId = categoryId;

  res.json({
    message: 'Article updated successfully',
    data: article,
  });
};

// DELETE /articles/:id
export const deleteArticle = (req, res) => {
  const id = parseInt(req.params.id);
  const index = articles.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Article not found' });
  }

  articles.splice(index, 1);
  res.status(204).send();
};
