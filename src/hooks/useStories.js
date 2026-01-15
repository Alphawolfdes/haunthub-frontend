import { useState, useEffect, useCallback } from "react";
import {
  fetchStories,
  SORT_OPTIONS,
  TIME_FILTERS,
} from "../services/redditAPI";

export const useStories = (initialOptions = {}) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [after, setAfter] = useState(null);

  const [options, setOptions] = useState({
    sort: SORT_OPTIONS.hot,
    timeFilter: TIME_FILTERS.week,
    limit: 25,
    query: null,
    ...initialOptions,
  });

  // Load stories
  const loadStories = useCallback(
    async (resetList = true) => {
      try {
        setLoading(true);
        setError(null);

        const currentAfter = resetList ? null : after;
        const response = await fetchStories({
          ...options,
          after: currentAfter,
        });

        if (resetList) {
          setStories(response.stories);
          setAfter(response.after);
        } else {
          setStories((prev) => [...prev, ...response.stories]);
          setAfter(response.after);
        }

        setHasMore(!!response.after && response.stories.length > 0);
      } catch (err) {
        console.error("Error loading stories:", err);
        setError(err.message || "Failed to load stories");

        // If it's the first load, set empty array to prevent infinite loading
        if (resetList) {
          setStories([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [options, after]
  );

  // Load more stories
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadStories(false);
    }
  }, [loadStories, loading, hasMore]);

  // Refresh stories (reset list)
  const refresh = useCallback(() => {
    setAfter(null);
    loadStories(true);
  }, [loadStories]);

  // Update search/filter options
  const updateOptions = useCallback((newOptions) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
    setAfter(null);
  }, []);

  // Search for stories
  const search = useCallback(
    (query) => {
      updateOptions({ query: query || null });
    },
    [updateOptions]
  );

  // Change sort option
  const changeSort = useCallback(
    (sort) => {
      updateOptions({ sort });
    },
    [updateOptions]
  );

  // Change time filter
  const changeTimeFilter = useCallback(
    (timeFilter) => {
      updateOptions({ timeFilter });
    },
    [updateOptions]
  );

  // Load stories when options change
  useEffect(() => {
    loadStories(true);
  }, [options]);

  return {
    // Data
    stories,
    loading,
    error,
    hasMore,

    // Current options
    currentSort: options.sort,
    currentTimeFilter: options.timeFilter,
    currentQuery: options.query,

    // Actions
    loadMore,
    refresh,
    search,
    changeSort,
    changeTimeFilter,
    updateOptions,
  };
};

export default useStories;
