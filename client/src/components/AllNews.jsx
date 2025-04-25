import React, { useState, useEffect } from 'react';
import EverythingCard from './EverythingCard';
import Loader from './Loader';

function AllNews() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveMessage, setSaveMessage] = useState(''); // New state for save message
  const pageSize = 12;

  const handlePrev = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://news-aggregator-dusky.vercel.app/all-news?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const myJson = await response.json();
        if (myJson.success) {
          setTotalResults(myJson.data.totalResults);
          setData(myJson.data.articles);
        } else {
          throw new Error(myJson.message || 'An error occurred while fetching data');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  const saveArticle = async (article) => {
    try {
      const response = await fetch('http://localhost:5000/api/save-news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });

      if (response.status === 409) {
        setSaveMessage('News already in the database'); // Set specific message for existing articles
      } else if (response.ok) {
        const result = await response.json();
        setSaveMessage(result.message); // Show success message
        setTimeout(() => setSaveMessage(''), 3000); // Clear message after 3 seconds
      } else {
        throw new Error('Failed to save article');
      }
    } catch (error) {
      console.error('Save error:', error);
      setError('An error occurred while saving the article.');
    }
  };

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {saveMessage && (
        <div className="text-green-500 mb-4 text-center">
          {saveMessage}
        </div>
      )}
      {!isLoading && data.length === 0 && !error && (
        <div className="text-center my-4">No articles found. Try a different search.</div>
      )}
      <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3'>
        {isLoading ? (
          <Loader />
        ) : (
          data
            .filter(element => element.urlToImage) // Filter articles with no image
            .map((element, index) => (
              <EverythingCard
                key={index}
                title={element.title}
                description={element.description}
                imgUrl={element.urlToImage}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
                onSave={() => saveArticle({
                  title: element.title,
                  description: element.description,
                  url: element.url,
                  source: element.source.name,
                  publishedAt: element.publishedAt,
                  image: element.urlToImage, // Include image URL for saving
                })}
              />
            ))
        )}
      </div>

      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button disabled={page <= 1} className='pagination-btn text-center' onClick={handlePrev}>
            &larr; Prev
          </button>
          <p className='font-semibold opacity-80'>{page} of {Math.ceil(totalResults / pageSize)}</p>
          <button
            disabled={page >= Math.ceil(totalResults / pageSize)}
            className='pagination-btn text-center'
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </>
  );
}

export default AllNews;
