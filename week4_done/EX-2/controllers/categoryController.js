import { categories, articles } from '../models/data.js';

// GET /categories
export const getCategories = (req, res) => {
  res.json({
    message: 'Get all categories successfully',
    count: categories.length,
    data: categories,
  });
};

// GET /categories/:id
export const getCategory = (req, res) => {
  const id = parseInt(req.params.id);
  const category = categories.find(c => c.id === id);

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  // Include articles in this category
  const categoryArticles = articles.filter(a => a.categoryId === id);

  res.json({
    message: 'Get category successfully',
    data: { ...category, articles: categoryArticles },
  });
};
