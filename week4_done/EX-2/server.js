import express from 'express';
import articleRoutes from './routes/articleRoutes.js';
import journalistRoutes from './routes/journalistRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Welcome
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the News API',
    endpoints: {
      articles:    '/articles  (GET, POST, PUT, DELETE)',
      journalists: '/journalists  (GET)',
      categories:  '/categories  (GET)',
    },
  });
});

// Routes
app.use('/articles', articleRoutes);
app.use('/journalists', journalistRoutes);
app.use('/categories', categoryRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
