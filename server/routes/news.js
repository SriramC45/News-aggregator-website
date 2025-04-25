const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Save news article
router.post('/save-news', async (req, res) => {
  const { title, description, url, source, publishedAt, image } = req.body;

  const newArticle = new News({ title, description, url, source, publishedAt, image });

  try {
    await newArticle.save();
    res.status(201).json({ success: true, message: 'Article saved successfully!' });
  } catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({ success: false, message: 'Failed to save article.' });
  }
});

// Get all saved news articles
router.get('/saved-news', async (req, res) => {
  try {
    const articles = await News.find();
    res.status(200).json({ success: true, data: articles });
  } catch (error) {
    console.error('Error fetching saved articles:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch articles.' });
  }
});

// Delete news article by ID
router.delete('/delete-news/:id', async (req, res) => {
  try {
    const deletedArticle = await News.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    res.status(200).json({ success: true, message: 'Article deleted successfully!' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ success: false, message: 'Failed to delete article.' });
  }
});

module.exports = router;
