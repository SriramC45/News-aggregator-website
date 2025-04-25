import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EverythingCard from './EverythingCard';
import Loader from './Loader';

function News() {
  const params = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessKey = '25c39ebc629d87105fdaafa914d9e217'; // MediaStack API key
  const pageSize = 30;

  // Determine if the news is for India or US based on URL
  const country = params.iso || (window.location.href.includes('/country/in') ? 'in' : 'us');

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch only 12 articles based on the country
      const response = await fetch(
        `http://api.mediastack.com/v1/news?access_key=${accessKey}&countries=${country}&limit=${pageSize}`
      );
      const data = await response.json();
      console.log(`Response for ${country} news:`, data); // Debugging line

      if (data.data) {
        // Filter articles with images
        const articlesWithImages = data.data.filter((article) => article.image).slice(0, pageSize);
        setNews(articlesWithImages);
      } else {
        setError(data.error || 'No articles found.');
      }
    } catch (err) {
      setError(`Error fetching ${country === 'in' ? 'Indian' : 'US'} news`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [country]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 mb-4">{error}</div>;

  return (
    <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
      {news.length > 0 ? (
        news.map((article) => (
          <div key={article.url} className="everything-card flex flex-wrap p-5 gap-1 mb-1">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <h2 className="text-lg font-bold mt-2">{article.title}</h2>
              <p className="text-gray-700">{article.description}</p>
              <p className="text-gray-600">
                Author: {article.author || 'Unknown'}<br />
                Published At: {new Date(article.published_at).toLocaleString()}
              </p>
            </a>
          </div>
        ))
      ) : (
        <p>No news articles found for this criteria.</p>
      )}
    </div>
  );
}

export default News;