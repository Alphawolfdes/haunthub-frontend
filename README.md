# 👻 HauntHub

<div align="center">
  <img src="public/favicon.svg" alt="HauntHub Logo" width="120" height="120">
  
  **Your gateway to spine-chilling paranormal stories from Reddit**
  
  [![Deployment Status](https://github.com/kingdes/haunthub-frontend/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/kingdes/haunthub-frontend/actions)
  [![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://kingdes.github.io/haunthub-frontend/)
</div>

## 🌟 Features

- 🔍 **Smart Search**: Advanced search functionality across multiple paranormal subreddits
- 📱 **Responsive Design**: Optimized for all devices with a spooky dark theme
- ⚡ **Real-time Content**: Fresh stories from Reddit's most haunting communities
- 🎯 **Advanced Filtering**: Sort by hot, new, top, or rising with time-based filters
- 🚀 **Fast Performance**: Built with Vite for lightning-fast loading
- 🌙 **Dark Theme**: Perfect atmosphere for reading scary stories

## 🏗️ Tech Stack

- **Frontend Framework**: React 18 with modern hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Pure CSS with BEM methodology and CSS custom properties
- **Routing**: React Router for seamless navigation
- **API**: Reddit's public JSON API with CORS proxy fallback
- **Deployment**: GitHub Pages with automated CI/CD
- **Package Manager**: npm

## 📖 Story Sources

HauntHub aggregates stories from these popular Reddit communities:

- **r/nosleep** - Original horror stories that will keep you up at night
- **r/paranormal** - Real-life paranormal experiences and encounters
- **r/LetsNotMeet** - Scary true stories about real people
- **r/creepy** - Disturbing content that will give you the chills
- **r/shortscarystories** - Bite-sized horror stories under 500 words
- **r/TwoSentenceHorror** - Complete horror stories in just two sentences
- And many more paranormal communities!

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Git

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/kingdes/haunthub-frontend.git
   cd haunthub-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000/haunthub-frontend/`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to GitHub Pages

```bash
npm run deploy
```

## 🎨 Project Structure

```
haunthub-frontend/
├── public/                 # Static assets
│   └── favicon.svg        # App icon
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Header/       # Navigation header
│   │   ├── Footer/       # Site footer
│   │   ├── StoryCard/    # Individual story display
│   │   └── SearchControls/ # Search and filter UI
│   ├── pages/            # Route components
│   │   ├── Home/         # Main stories page
│   │   └── About/        # About page
│   ├── hooks/            # Custom React hooks
│   │   └── useStories.js # Stories data management
│   ├── services/         # External API services
│   │   └── redditAPI.js  # Reddit API integration
│   ├── styles/           # Global styles and CSS
│   ├── App.jsx           # Root component
│   └── main.jsx          # App entry point
├── .github/workflows/    # GitHub Actions
└── package.json          # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages

## 🌐 API Integration

### Reddit API

HauntHub uses Reddit's public JSON API to fetch stories:

- **Endpoint**: `https://www.reddit.com/r/{subreddit}/{sort}.json`
- **CORS Handling**: Automatic fallback to CORS proxy when needed
- **Rate Limiting**: Respectful API usage with error handling
- **Data Processing**: Clean and format Reddit response data

### Search Features

- **Multi-subreddit search** across all paranormal communities
- **Real-time filtering** by sort type and time period
- **Pagination support** with "Load More" functionality
- **Query suggestions** for better discovery

## 🎯 Key Components

### StoryCard

Displays individual Reddit stories with:

- Title and content preview
- Author and subreddit information
- Score and comment count
- Direct link to original Reddit post
- Responsive hover effects

### SearchControls

Advanced search interface featuring:

- Text-based story search
- Sort options (Hot, New, Top, Rising)
- Time range filters
- Search suggestions
- Mobile-friendly collapsible design

### useStories Hook

Custom React hook managing:

- API calls and error handling
- Loading states and pagination
- Search and filter state
- Data caching and optimization

## 🚀 Deployment

The app is automatically deployed to GitHub Pages using GitHub Actions when code is pushed to the main branch. The workflow:

1. **Build**: Install dependencies and create production build
2. **Test**: Verify build integrity
3. **Deploy**: Publish to GitHub Pages
4. **Live**: Available at https://kingdes.github.io/haunthub-frontend/

## 📱 Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## ⚠️ Content Advisory

**Important**: Stories on HauntHub are user-generated content from Reddit and may contain:

- Mature themes and scary scenarios
- Supernatural and paranormal content
- Real-life encounters (as reported by users)

All content belongs to original Reddit authors. Click through to Reddit to engage with the community.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Reddit and its paranormal communities for providing the stories
- The open-source React and Vite communities
- All the storytellers who share their spooky experiences

---

<div align="center">
  <strong>Enter if you dare... 👻</strong><br>
  Built with ❤️ for horror enthusiasts
</div>
