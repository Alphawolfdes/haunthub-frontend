import React from "react";
import "./About.css";

const About = () => {
  const features = [
    {
      icon: "🔍",
      title: "Smart Search",
      description:
        "Search through thousands of paranormal stories with advanced filtering options.",
    },
    {
      icon: "🎯",
      title: "Multiple Sources",
      description:
        "Stories from the best paranormal subreddits including r/nosleep, r/paranormal, and more.",
    },
    {
      icon: "⚡",
      title: "Real-time Updates",
      description:
        "Get the latest spine-chilling stories as they're posted on Reddit.",
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description:
        "Enjoy your favorite horror stories on any device, anywhere, anytime.",
    },
  ];

  const subreddits = [
    {
      name: "r/nosleep",
      description: "Original horror stories that will keep you up at night",
    },
    {
      name: "r/paranormal",
      description: "Real-life paranormal experiences and encounters",
    },
    {
      name: "r/LetsNotMeet",
      description: "Scary true stories about real people",
    },
    {
      name: "r/creepy",
      description: "Disturbing content that will give you the chills",
    },
    {
      name: "r/shortscarystories",
      description: "Bite-sized horror stories under 500 words",
    },
    {
      name: "r/TwoSentenceHorror",
      description: "Complete horror stories in just two sentences",
    },
  ];

  return (
    <div className="about">
      <div className="container">
        {/* Hero Section */}
        <section className="about__hero">
          <h1 className="about__title">
            <span className="about__title-main">About HauntHub</span>
            <span className="about__title-emoji">👻</span>
          </h1>
          <p className="about__subtitle">
            Your gateway to the most spine-chilling stories from Reddit
          </p>
        </section>

        {/* Introduction */}
        <section className="about__intro">
          <div className="about__intro-content">
            <p className="about__intro-text">
              Welcome to <strong>HauntHub</strong>, where the supernatural meets
              the digital age. We've created a curated collection of the most
              haunting, mysterious, and downright terrifying stories from
              Reddit's paranormal communities.
            </p>
            <p className="about__intro-text">
              Whether you're seeking spine-tingling tales for a dark night,
              researching paranormal phenomena, or simply love a good scare,
              HauntHub brings together the best horror content from across
              Reddit's most popular supernatural subreddits.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="about__features">
          <h2 className="about__section-title">Features</h2>
          <div className="about__features-grid">
            {features.map((feature, index) => (
              <div key={index} className="about__feature-card">
                <div className="about__feature-icon">{feature.icon}</div>
                <h3 className="about__feature-title">{feature.title}</h3>
                <p className="about__feature-description">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Data Sources */}
        <section className="about__sources">
          <h2 className="about__section-title">Story Sources</h2>
          <p className="about__sources-intro">
            Our stories are sourced from the most popular paranormal and horror
            communities on Reddit:
          </p>
          <div className="about__subreddits-grid">
            {subreddits.map((subreddit, index) => (
              <div key={index} className="about__subreddit-card">
                <h3 className="about__subreddit-name">{subreddit.name}</h3>
                <p className="about__subreddit-description">
                  {subreddit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="about__how-it-works">
          <h2 className="about__section-title">How It Works</h2>
          <div className="about__steps">
            <div className="about__step">
              <div className="about__step-number">1</div>
              <div className="about__step-content">
                <h3 className="about__step-title">Browse or Search</h3>
                <p className="about__step-description">
                  Explore trending stories or use our search feature to find
                  specific types of paranormal encounters.
                </p>
              </div>
            </div>
            <div className="about__step">
              <div className="about__step-number">2</div>
              <div className="about__step-content">
                <h3 className="about__step-title">Filter & Sort</h3>
                <p className="about__step-description">
                  Use our advanced filters to sort by popularity, recency, or
                  time period to find exactly what scares you most.
                </p>
              </div>
            </div>
            <div className="about__step">
              <div className="about__step-number">3</div>
              <div className="about__step-content">
                <h3 className="about__step-title">Read & Discuss</h3>
                <p className="about__step-description">
                  Click any story card to read the full tale on Reddit, where
                  you can engage with the community and share your thoughts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="about__tech">
          <h2 className="about__section-title">Built With</h2>
          <div className="about__tech-stack">
            <div className="about__tech-item">
              <span className="about__tech-name">React</span>
              <span className="about__tech-description">
                Frontend framework
              </span>
            </div>
            <div className="about__tech-item">
              <span className="about__tech-name">Reddit API</span>
              <span className="about__tech-description">Story data source</span>
            </div>
            <div className="about__tech-item">
              <span className="about__tech-name">Vite</span>
              <span className="about__tech-description">Build tool</span>
            </div>
            <div className="about__tech-item">
              <span className="about__tech-name">GitHub Pages</span>
              <span className="about__tech-description">Hosting</span>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="about__disclaimer">
          <h2 className="about__section-title">Important Note</h2>
          <div className="about__disclaimer-content">
            <p>
              <strong>Content Advisory:</strong> The stories featured on
              HauntHub are sourced from Reddit and may contain mature themes,
              supernatural content, and scary scenarios. All stories are
              user-generated content and should be treated as entertainment.
            </p>
            <p>
              We do not claim ownership of any stories displayed on this
              platform. All content belongs to the original authors and Reddit.
              Click through to Reddit to engage with the original posts and
              support the storytelling community.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="about__cta">
          <div className="about__cta-content">
            <h2 className="about__cta-title">Ready to Get Spooked? 👻</h2>
            <p className="about__cta-description">
              Dive into our collection of paranormal stories and prepare for
              sleepless nights.
            </p>
            <a href="/" className="btn btn--primary about__cta-button">
              Explore Stories
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
