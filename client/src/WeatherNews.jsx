// src/WeatherNews.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WeatherNews.css';
import EverythingCard from './components/EverythingCard'; // Assuming you have this component for rendering each article card
import Loader from './components/Loader'; // Assuming you have a Loader component for loading state

const WeatherNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Pagination state
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 9; // Number of articles per page

  const apiKey = 'b44f8db928f8c40801f2b06c46e95e06';
  const baseURL = 'http://api.mediastack.com/v1/news';
  useEffect(() => {
    const fetchWeatherNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(baseURL, {
          params: {
            access_key: apiKey,
            keywords: 'weather',
            limit: 30,
            language: 'en',
          },
        });

        setArticles(response.data.data);
        setTotalResults(response.data.pagination.total); // Assuming API provides total results
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchWeatherNews();
  }, [page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => prev - 1);

  const articlesWithImages = articles.filter(article => article.image);
  const displayedArticles = articlesWithImages.slice(0, pageSize);

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
        {displayedArticles.map((article, index) => (
          <EverythingCard
            key={index}
            title={article.title}
            imgUrl={article.image}
            publishedAt={article.published_at}
            url={article.url}
            author={article.author}
            source={article.source}
          />
        ))}
      </div>
    </>
  );
};

export default WeatherNews;
