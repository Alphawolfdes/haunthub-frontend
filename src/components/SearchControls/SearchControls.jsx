import React, { useState, useCallback } from "react";
import { SORT_OPTIONS, TIME_FILTERS } from "../../services/redditAPI";
import "./SearchControls.css";

const SearchControls = ({
  onSearch,
  onSortChange,
  onTimeFilterChange,
  currentSort = SORT_OPTIONS.hot,
  currentTimeFilter = TIME_FILTERS.week,
  currentQuery = "",
  loading = false,
}) => {
  const [query, setQuery] = useState(currentQuery);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Handle search form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSearch(query.trim());
    },
    [query, onSearch]
  );

  // Handle input change
  const handleInputChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  // Clear search
  const handleClear = useCallback(() => {
    setQuery("");
    onSearch("");
  }, [onSearch]);

  // Sort options with display names
  const sortOptions = [
    { value: SORT_OPTIONS.hot, label: "Hot", icon: "🔥" },
    { value: SORT_OPTIONS.new, label: "New", icon: "✨" },
    { value: SORT_OPTIONS.top, label: "Top", icon: "⬆️" },
    { value: SORT_OPTIONS.rising, label: "Rising", icon: "📈" },
  ];

  // Time filter options with display names
  const timeFilterOptions = [
    { value: TIME_FILTERS.hour, label: "Past Hour" },
    { value: TIME_FILTERS.day, label: "Past Day" },
    { value: TIME_FILTERS.week, label: "Past Week" },
    { value: TIME_FILTERS.month, label: "Past Month" },
    { value: TIME_FILTERS.year, label: "Past Year" },
    { value: TIME_FILTERS.all, label: "All Time" },
  ];

  return (
    <div className="search-controls">
      <div className="container">
        {/* Search Form */}
        <form className="search-controls__form" onSubmit={handleSubmit}>
          <div className="search-controls__input-group">
            <input
              type="text"
              className="search-controls__input"
              placeholder="Search for paranormal stories... 👻"
              value={query}
              onChange={handleInputChange}
              disabled={loading}
            />
            <button
              type="submit"
              className="search-controls__submit btn btn--primary"
              disabled={loading}
              aria-label="Search stories"
            >
              {loading ? "🔍" : "🔎"}
            </button>
            {query && (
              <button
                type="button"
                className="search-controls__clear btn btn--ghost"
                onClick={handleClear}
                disabled={loading}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </form>

        {/* Advanced Controls Toggle */}
        <button
          className="search-controls__advanced-toggle btn btn--ghost"
          onClick={() => setShowAdvanced(!showAdvanced)}
          aria-expanded={showAdvanced}
          aria-label="Toggle advanced search options"
        >
          Advanced Options {showAdvanced ? "▼" : "▶️"}
        </button>

        {/* Advanced Controls */}
        {showAdvanced && (
          <div className="search-controls__advanced">
            {/* Sort Options */}
            <div className="search-controls__group">
              <label className="search-controls__label">Sort by:</label>
              <div className="search-controls__options">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`search-controls__option btn ${
                      currentSort === option.value
                        ? "btn--primary"
                        : "btn--secondary"
                    }`}
                    onClick={() => onSortChange(option.value)}
                    disabled={loading}
                  >
                    <span className="search-controls__option-icon">
                      {option.icon}
                    </span>
                    <span className="search-controls__option-label">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Filter (only show for 'top' sort) */}
            {currentSort === SORT_OPTIONS.top && (
              <div className="search-controls__group">
                <label className="search-controls__label">Time range:</label>
                <div className="search-controls__options">
                  {timeFilterOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`search-controls__option btn ${
                        currentTimeFilter === option.value
                          ? "btn--primary"
                          : "btn--secondary"
                      }`}
                      onClick={() => onTimeFilterChange(option.value)}
                      disabled={loading}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search Suggestions */}
        {!query && (
          <div className="search-controls__suggestions">
            <span className="search-controls__suggestions-label">
              Try searching for:
            </span>
            <div className="search-controls__suggestion-tags">
              {[
                "ghost stories",
                "haunted house",
                "paranormal activity",
                "creepy encounters",
                "unexplained",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  className="search-controls__suggestion-tag"
                  onClick={() => {
                    setQuery(suggestion);
                    onSearch(suggestion);
                  }}
                  disabled={loading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchControls;
