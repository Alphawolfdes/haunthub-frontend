import React from "react";
import "./StoryCard.css";

const StoryCard = ({ story }) => {
  const {
    title,
    selftext,
    author,
    created_utc,
    score,
    num_comments,
    subreddit,
    permalink,
    url,
  } = story.data;

  // Format the date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Truncate text to a specific length
  const truncateText = (text, maxLength = 200) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  // Handle card click to open Reddit post
  const handleCardClick = () => {
    window.open(
      `https://reddit.com${permalink}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      className="story-card"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Read story: ${title}`}
    >
      <div className="story-card__header">
        <h3 className="story-card__title">{title}</h3>
        <div className="story-card__subreddit">r/{subreddit}</div>
      </div>

      <div className="story-card__content">
        {selftext && (
          <p className="story-card__text">{truncateText(selftext)}</p>
        )}
      </div>

      <div className="story-card__footer">
        <div className="story-card__meta">
          <span className="story-card__author">u/{author}</span>
          <span className="story-card__date">{formatDate(created_utc)}</span>
        </div>

        <div className="story-card__stats">
          <div className="story-card__stat">
            <span className="story-card__stat-icon">🔺</span>
            <span className="story-card__stat-value">{score}</span>
          </div>
          <div className="story-card__stat">
            <span className="story-card__stat-icon">💬</span>
            <span className="story-card__stat-value">{num_comments}</span>
          </div>
        </div>
      </div>

      <div className="story-card__overlay">
        <span className="story-card__cta">Click to read on Reddit</span>
      </div>
    </article>
  );
};

export default StoryCard;
