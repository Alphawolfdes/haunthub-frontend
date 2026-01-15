// Reddit API service for fetching paranormal stories

const REDDIT_BASE_URL = "https://www.reddit.com";
const CORS_PROXY = "https://corsproxy.io/?";

// List of paranormal subreddits to search
const PARANORMAL_SUBREDDITS = [
  "nosleep",
  "paranormal",
  "LetsNotMeet",
  "creepy",
  "shortscarystories",
  "TwoSentenceHorror",
  "Paranormal_Evidence",
  "Ghosts",
  "Horror_stories",
  "scarystories",
];

// Time filters for Reddit API
export const TIME_FILTERS = {
  hour: "hour",
  day: "day",
  week: "week",
  month: "month",
  year: "year",
  all: "all",
};

// Sort options for Reddit API
export const SORT_OPTIONS = {
  hot: "hot",
  new: "new",
  top: "top",
  rising: "rising",
};

class RedditAPI {
  constructor() {
    this.baseUrl = REDDIT_BASE_URL;
    this.useProxy = false;
  }

  // Build URL with or without CORS proxy
  buildUrl(endpoint) {
    const fullUrl = `${this.baseUrl}${endpoint}.json`;
    return this.useProxy
      ? `${CORS_PROXY}${encodeURIComponent(fullUrl)}`
      : fullUrl;
  }

  // Make API request with error handling
  async makeRequest(url, options = {}) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(
          `Reddit API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // If request fails and we're not using proxy, try with proxy
      if (!this.useProxy && error.message.includes("CORS")) {
        console.warn("CORS error detected, switching to proxy...");
        this.useProxy = true;
        return this.makeRequest(url, options);
      }
      throw error;
    }
  }

  // Fetch stories from a specific subreddit
  async fetchFromSubreddit(
    subreddit,
    sort = SORT_OPTIONS.hot,
    timeFilter = TIME_FILTERS.week,
    limit = 25,
    after = null
  ) {
    const params = new URLSearchParams({
      limit: limit.toString(),
      raw_json: "1",
    });

    if (after) {
      params.append("after", after);
    }

    if (sort === SORT_OPTIONS.top && timeFilter) {
      params.append("t", timeFilter);
    }

    const endpoint = `/r/${subreddit}/${sort}`;
    const url = this.buildUrl(`${endpoint}?${params.toString()}`);

    const data = await this.makeRequest(url);
    return this.processRedditResponse(data);
  }

  // Search Reddit for paranormal stories
  async searchStories(
    query = "horror scary paranormal ghost",
    sort = SORT_OPTIONS.top,
    timeFilter = TIME_FILTERS.month,
    limit = 25,
    after = null
  ) {
    const params = new URLSearchParams({
      q: query,
      sort: sort,
      type: "link",
      limit: limit.toString(),
      raw_json: "1",
    });

    if (after) {
      params.append("after", after);
    }

    if (timeFilter) {
      params.append("t", timeFilter);
    }

    // Search in paranormal subreddits
    const subredditQuery = PARANORMAL_SUBREDDITS.map(
      (sub) => `subreddit:${sub}`
    ).join(" OR ");
    params.set("q", `${query} (${subredditQuery})`);

    const endpoint = "/search";
    const url = this.buildUrl(`${endpoint}?${params.toString()}`);

    const data = await this.makeRequest(url);
    return this.processRedditResponse(data);
  }

  // Fetch stories from multiple paranormal subreddits
  async fetchParanormalStories(
    sort = SORT_OPTIONS.hot,
    timeFilter = TIME_FILTERS.week,
    limit = 25,
    after = null
  ) {
    try {
      // Try to fetch from r/nosleep first (most popular)
      return await this.fetchFromSubreddit(
        "nosleep",
        sort,
        timeFilter,
        limit,
        after
      );
    } catch (error) {
      console.warn(
        "Failed to fetch from r/nosleep, trying search:",
        error.message
      );

      // Fallback to search across multiple subreddits
      return await this.searchStories(
        "horror scary paranormal ghost supernatural creepy",
        sort,
        timeFilter,
        limit,
        after
      );
    }
  }

  // Get trending paranormal stories
  async getTrendingStories(limit = 25, after = null) {
    return this.fetchParanormalStories(
      SORT_OPTIONS.hot,
      TIME_FILTERS.day,
      limit,
      after
    );
  }

  // Get top paranormal stories
  async getTopStories(
    timeFilter = TIME_FILTERS.week,
    limit = 25,
    after = null
  ) {
    return this.fetchParanormalStories(
      SORT_OPTIONS.top,
      timeFilter,
      limit,
      after
    );
  }

  // Get newest paranormal stories
  async getNewStories(limit = 25, after = null) {
    return this.fetchParanormalStories(SORT_OPTIONS.new, null, limit, after);
  }

  // Process Reddit API response
  processRedditResponse(data) {
    if (!data || !data.data || !data.data.children) {
      throw new Error("Invalid Reddit API response format");
    }

    const stories = data.data.children
      .filter((child) => child.data && child.data.title)
      .filter((child) => !child.data.stickied) // Remove stickied posts
      .filter((child) => child.data.selftext || child.data.url) // Must have content
      .filter((child) => !child.data.over_18 || true) // Include NSFW for horror stories
      .map((child) => ({
        ...child,
        data: {
          ...child.data,
          // Ensure we have clean text content
          selftext:
            child.data.selftext === "[removed]" ? "" : child.data.selftext,
          // Add computed fields
          readingTime: this.estimateReadingTime(child.data.selftext || ""),
          createdDate: new Date(child.data.created_utc * 1000),
        },
      }));

    return {
      stories,
      after: data.data.after,
      before: data.data.before,
      count: stories.length,
    };
  }

  // Estimate reading time for a story
  estimateReadingTime(text) {
    if (!text) return 0;
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // Get subreddit information
  async getSubredditInfo(subreddit) {
    const endpoint = `/r/${subreddit}/about`;
    const url = this.buildUrl(endpoint);

    try {
      const data = await this.makeRequest(url);
      return data.data;
    } catch (error) {
      console.warn(`Failed to fetch info for r/${subreddit}:`, error.message);
      return null;
    }
  }
}

// Create and export a singleton instance
export const redditAPI = new RedditAPI();

// Helper functions for components
export const fetchStories = (options = {}) => {
  const {
    sort = SORT_OPTIONS.hot,
    timeFilter = TIME_FILTERS.week,
    limit = 25,
    after = null,
    query = null,
  } = options;

  if (query) {
    return redditAPI.searchStories(query, sort, timeFilter, limit, after);
  }

  return redditAPI.fetchParanormalStories(sort, timeFilter, limit, after);
};

export default redditAPI;
