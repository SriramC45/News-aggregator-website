import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedNews = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/saved-news');
        setSavedArticles(response.data.data);
      } catch (error) {
        console.error('Error fetching saved articles:', error);
        setError('Failed to load saved articles.');
      }
    };

    fetchSavedArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/delete-news/${id}`);
      alert(response.data.message);
      setSavedArticles(savedArticles.filter((article) => article._id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete the article.');
    }
  };

  return (
    <div className="saved-news-container container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Saved News Articles</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {savedArticles.length === 0 && !error ? (
        <div className="flex flex-col items-center text-center text-gray-600 mt-10">
          <p className="text-xl font-semibold">No saved articles found.</p>
          <p className="mt-2">Save some articles to view them here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedArticles.map((article) => (
            <div
              className="everything-card flex flex-col p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              key={article._id}
            >
              <img
                src={article.image}
                alt={article.title}
                className="everything-card-img mx-auto mb-2 rounded"
              />
              <h3 className="article-title font-semibold text-lg mb-2">{article.title}</h3>
              <p className="description-text leading-7 mb-2">{article.description}</p>
              <p className="text-gray-600 mb-1">Source: {article.source}</p>
              <p className="text-gray-600 mb-1">
                Published At: {new Date(article.publishedAt).toLocaleString()}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more text-blue-500 hover:underline mb-2"
              >
                Read more
              </a>
              <button
                onClick={() => handleDelete(article._id)}
                className="delete-button bg-red-500 text-white rounded px-4 py-2 mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedNews;
