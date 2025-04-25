import React from "react";

function EverythingCard({
  title,
  description,
  imgUrl,
  publishedAt,
  url,
  author,
  source,
  onSave,
  imageUrlLeft,
  imageLeftTitle,
  memberIcon,
  memberText,
  cardTitle,
  cardDescription,
  authorImage,
  authorName,
  publishedDate,
}) {
  const handleSave = async () => {
    try {
      await onSave();
      alert("Article saved successfully!");
    } catch (error) {
      alert("Failed to save the article. Please try again.");
    }
  };

  return (
    <div className="everything-card mt-10">
      <div className="everything-card flex flex-wrap p-5 gap-1 mb-1">
        <b className="title">{title}</b>
        <div className="everything-card-img mx-auto">
          <img className="everything-card-img" src={imgUrl} alt="Article" />
        </div>
        <div className="description">
          <p className="description-text leading-7">
            {description?.substring(0, 200)}
          </p>
        </div>
        <div className="info">
          <div className="source-info flex items-center gap-2">
            <span className="font-semibold">Source:</span>
            <a
              href={url}
              target="_blank"
              className="link underline break-words"
              rel="noopener noreferrer"
            >
              {source.substring(0, 70)}
            </a>
          </div>
          <div className="origin flex flex-col">
            <p className="origin-item">
              <span className="font-semibold">Author:</span>
              {author || 'Unknown'}
            </p>
            <p className="origin-item">
              <span className="font-semibold">Published At:</span>
              {new Date(publishedAt).toLocaleString()}
            </p>
          </div>
        </div>
        <button
          className="save-button bg-blue-500 text-white rounded px-4 py-2 mt-2 font-bold transition transform hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg active:bg-blue-900 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      <div className="flex lg:flex-row mt-4">
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${imageUrlLeft})` }}
          title={imageLeftTitle}
        ></div>
        <div className="border rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center">
              {memberIcon && (
                <svg
                  className="fill-current text-gray-500 w-3 h-3 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  {memberIcon}
                </svg>
              )}
              {memberText}
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
              {cardTitle}
            </div>
            <p className="text-gray-700 text-base">{cardDescription}</p>
          </div>
          <div className="flex items-center">
            {authorImage && (
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={authorImage}
                alt="Avatar"
              />
            )}
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{authorName}</p>
              <p className="text-gray-600">{publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EverythingCard;
