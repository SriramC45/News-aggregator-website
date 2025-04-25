const Article = require('../models/Article');

exports.getTopHeadlines = async (req, res) => {
  const { category, page, pageSize } = req.query;

  try {
    const query = {};
    if (category) {
      query.category = category;
    }

    const articles = await Article.find(query)
      .limit(parseInt(pageSize))
      .skip((parseInt(page) - 1) * parseInt(pageSize));

    const totalResults = await Article.countDocuments(query);

    res.json({ success: true, data: { articles, totalResults } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
