import React, { useState } from "react";
import useStories from "../../hooks/useStories";
import SearchControls from "../../components/SearchControls/SearchControls";
import StoryCard from "../../components/StoryCard/StoryCard";
import "./Home.css";

const Home = () => {
  const {
    stories,
    loading,
    error,
    hasMore,
    currentSort,
    currentTimeFilter,
    currentQuery,
    loadMore,
    refresh,
    search,
    changeSort,
    changeTimeFilter,
  } = useStories();

  const [loadingMore, setLoadingMore] = useState(false);

  // Handle load more with loading state
  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      await loadMore();
    } finally {
      setLoadingMore(false);
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="home__skeleton">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="story-card story-card--loading">
          <div className="story-card__header">
            <div className="story-card__title"></div>
            <div
              className="story-card__subreddit"
              style={{ width: "60px", height: "20px" }}
            ></div>
          </div>
          <div className="story-card__content">
            <div className="story-card__text"></div>
          </div>
          <div className="story-card__footer">
            <div className="story-card__meta">
              <div
                style={{
                  width: "80px",
                  height: "12px",
                  background: "var(--color-bg-tertiary)",
                  borderRadius: "4px",
                }}
              ></div>
              <div
                style={{
                  width: "60px",
                  height: "12px",
                  background: "var(--color-bg-tertiary)",
                  borderRadius: "4px",
                  marginTop: "4px",
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error component
  const ErrorMessage = ({ error, onRetry }) => (
    <div className="home__error">
      <div className="home__error-content">
        <span className="home__error-icon">😱</span>
        <h3 className="home__error-title">Something spooky happened!</h3>
        <p className="home__error-message">{error}</p>
        <button className="btn btn--primary" onClick={onRetry}>
          Try Again
        </button>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = ({ query }) => (
    <div className="home__empty">
      <div className="home__empty-content">
        <span className="home__empty-icon">👻</span>
        {query ? (
          <>
            <h3 className="home__empty-title">No stories found</h3>
            <p className="home__empty-message">
              No paranormal stories match your search for "{query}". Try
              different keywords or browse all stories.
            </p>
            <button className="btn btn--secondary" onClick={() => search("")}>
              Browse All Stories
            </button>
          </>
        ) : (
          <>
            <h3 className="home__empty-title">No stories available</h3>
            <p className="home__empty-message">
              We couldn't find any paranormal stories right now. Please try
              again later or adjust your filters.
            </p>
            <button className="btn btn--primary" onClick={refresh}>
              Refresh
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <div className="container">
          <h1 className="home__title">
            <span className="home__title-main">HauntHub</span>
            <span className="home__title-sub">
              Paranormal Stories from Reddit
            </span>
          </h1>
          <p className="home__description">
            Discover spine-chilling tales, unexplained encounters, and
            supernatural experiences from Reddit's most haunting communities.
            Enter if you dare... 👻
          </p>
        </div>
      </section>

      {/* Search Controls */}
      <SearchControls
        onSearch={search}
        onSortChange={changeSort}
        onTimeFilterChange={changeTimeFilter}
        currentSort={currentSort}
        currentTimeFilter={currentTimeFilter}
        currentQuery={currentQuery}
        loading={loading}
      />

      {/* Main Content */}
      <section className="home__content">
        <div className="container">
          {/* Current Query Display */}
          {currentQuery && (
            <div className="home__query-info">
              <span className="home__query-label">Searching for:</span>
              <span className="home__query-term">"{currentQuery}"</span>
              <span className="home__query-count">
                {stories.length} {stories.length === 1 ? "story" : "stories"}{" "}
                found
              </span>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <ErrorMessage error={error} onRetry={refresh} />
          )}

          {/* Loading State */}
          {loading && stories.length === 0 && <LoadingSkeleton />}

          {/* Empty State */}
          {!loading && !error && stories.length === 0 && (
            <EmptyState query={currentQuery} />
          )}

          {/* Stories Grid */}
          {stories.length > 0 && (
            <>
              <div className="home__stories-grid">
                {stories.map((story, index) => (
                  <StoryCard key={`${story.data.id}-${index}`} story={story} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="home__load-more">
                  <button
                    className="btn btn--primary home__load-more-btn"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? (
                      <>
                        <span className="home__load-more-spinner">⟳</span>
                        Loading more stories...
                      </>
                    ) : (
                      <>
                        <span>Load More Stories</span>
                        <span className="home__load-more-icon">👻</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* End Message */}
              {!hasMore && stories.length > 10 && (
                <div className="home__end-message">
                  <p>
                    You've reached the end of the haunting tales... for now. 🌙
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
