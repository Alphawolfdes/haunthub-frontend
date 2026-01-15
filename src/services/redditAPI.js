// Reddit API service for fetching paranormal stories

const REDDIT_BASE_URL = "https://www.reddit.com";
const CORS_PROXIES = [
  "https://api.allorigins.win/get?url=",
  "https://corsproxy.io/?",
  "https://cors-anywhere.herokuapp.com/",
];

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
    this.currentProxyIndex = 0;
    this.useProxy = true; // Start with proxy enabled for better compatibility
  }

  // Build URL with current CORS proxy
  buildUrl(endpoint) {
    const fullUrl = `${this.baseUrl}${endpoint}.json`;
    if (!this.useProxy) {
      return fullUrl;
    }

    const proxy = CORS_PROXIES[this.currentProxyIndex];
    return `${proxy}${encodeURIComponent(fullUrl)}`;
  }

  // Make API request with multiple proxy fallbacks
  async makeRequest(originalUrl, options = {}) {
    let lastError = null;

    // Extract endpoint from original URL if it's already a full URL
    let endpoint = originalUrl;
    if (originalUrl.startsWith("http")) {
      endpoint = originalUrl.replace(this.baseUrl, "").replace(".json", "");
    }

    // First try without proxy
    if (!this.useProxy) {
      try {
        const directUrl = `${this.baseUrl}${endpoint}.json`;
        const response = await fetch(directUrl, {
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
        console.warn(
          "Direct request failed, trying with proxy...",
          error.message
        );
        this.useProxy = true;
        lastError = error;
      }
    }

    // Try each proxy
    for (let i = 0; i < CORS_PROXIES.length; i++) {
      this.currentProxyIndex = i;

      try {
        const fullUrl = `${this.baseUrl}${endpoint}.json`;
        const proxy = CORS_PROXIES[i];
        const proxyUrl = `${proxy}${encodeURIComponent(fullUrl)}`;

        console.log(`Trying proxy ${i + 1}/${CORS_PROXIES.length}:`, proxy);

        const response = await fetch(proxyUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            ...options.headers,
          },
          ...options,
        });

        if (!response.ok) {
          throw new Error(
            `Proxy request failed: ${response.status} ${response.statusText}`
          );
        }

        let data = await response.json();

        // Handle allorigins.win response format
        if (data.contents) {
          data = JSON.parse(data.contents);
        }

        return data;
      } catch (error) {
        console.warn(`Proxy ${i + 1} failed:`, error.message);
        lastError = error;
      }
    }

    // If all proxies fail, throw the last error
    throw new Error(
      `All Reddit API requests failed. Last error: ${
        lastError?.message || "Unknown error"
      }`
    );
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
    const endpointWithParams = `${endpoint}?${params.toString()}`;

    const data = await this.makeRequest(endpointWithParams);
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
    const endpointWithParams = `${endpoint}?${params.toString()}`;

    const data = await this.makeRequest(endpointWithParams);
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

      try {
        // Fallback to search across multiple subreddits
        return await this.searchStories(
          "horror scary paranormal ghost supernatural creepy",
          sort,
          timeFilter,
          limit,
          after
        );
      } catch (searchError) {
        console.warn(
          "Search also failed, trying individual subreddits:",
          searchError.message
        );

        // Try individual subreddits as last resort
        for (const subreddit of ["paranormal", "creepy", "LetsNotMeet"]) {
          try {
            return await this.fetchFromSubreddit(
              subreddit,
              sort,
              timeFilter,
              Math.min(limit, 10),
              after
            );
          } catch (subError) {
            console.warn(
              `Failed to fetch from r/${subreddit}:`,
              subError.message
            );
          }
        }

        // If everything fails, return sample data
        console.warn(
          "All Reddit API requests failed, returning sample stories"
        );
        return this.getSampleStories();
      }
    }
  }

  // Sample data fallback when API fails
  getSampleStories() {
    const sampleStories = [
      {
        data: {
          id: "sample1",
          title: "The House That Watches You Back",
          selftext:
            "I moved into my grandmother's old house last month. Everything seemed normal until I noticed the windows. Every morning, I'd wake up to find handprints on the glass from the inside - but I live alone...",
          author: "sample_user_1",
          created_utc: Math.floor(Date.now() / 1000) - 86400,
          score: 847,
          num_comments: 123,
          subreddit: "nosleep",
          permalink:
            "/r/nosleep/comments/sample1/the_house_that_watches_you_back/",
          readingTime: 3,
          createdDate: new Date(),
        },
      },
      {
        data: {
          id: "sample2",
          title: "My Phone Keeps Getting Calls from My Own Number",
          selftext:
            "It started three weeks ago. Every night at 3:17 AM, my phone rings. The caller ID shows my own number. When I answer, I hear my own voice saying things I've never said...",
          author: "sample_user_2",
          created_utc: Math.floor(Date.now() / 1000) - 172800,
          score: 634,
          num_comments: 89,
          subreddit: "paranormal",
          permalink:
            "/r/paranormal/comments/sample2/phone_calls_from_my_own_number/",
          readingTime: 4,
          createdDate: new Date(),
        },
      },
      {
        data: {
          id: "sample3",
          title: "The Elevator That Goes to Floors That Don't Exist",
          selftext:
            "My office building has 20 floors. But sometimes, late at night, the elevator buttons show floors 21, 22, and 23. I made the mistake of pressing 21 yesterday...",
          author: "sample_user_3",
          created_utc: Math.floor(Date.now() / 1000) - 259200,
          score: 1205,
          num_comments: 167,
          subreddit: "LetsNotMeet",
          permalink: "/r/LetsNotMeet/comments/sample3/elevator_mystery_floors/",
          readingTime: 5,
          createdDate: new Date(),
        },
      },
    ];

    return {
      stories: sampleStories,
      after: null,
      before: null,
      count: sampleStories.length,
    };
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
