# 📸 Unsplash Gallery

A small React + TypeScript project that uses the **Unsplash API** to browse and search for images.  
Includes infinite scroll, search history, and a modal for viewing photo details (views, likes, downloads).

---

## ⚙️ How to Start the Project

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/unsplash-gallery.git
cd unsplash-gallery
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

## Project Structure

src/
├── components/
│ ├── PhotoModal.tsx # Modal showing full image + stats
│ ├── Sidebar.tsx # Sidebar navigation
│ ├── SkeletonCard.tsx # Single skeleton placeholder
│ ├── SkeletonGrid.tsx # Grid of skeleton loaders
│ ├── Stat.tsx # Displays stats (views, likes, downloads)
│ └── Wrapper.tsx # Layout wrapper for consistent width
│
├── hooks/
│ ├── useDebouncedValue.ts # Debounce hook for search input
│ ├── usePhotoData.ts # Fetch detailed photo stats
│ └── usePhotosFeedInfinite.ts # Infinite scroll logic (popular + search)
│
├── lib/
│ └── unsplashClient.ts # Axios client configured for Unsplash API
│
├── pages/
│ ├── History.tsx # Displays search history and results
│ └── Home.tsx # Main page (search + infinite scroll)
│
├── services/
│ └── imagesApi.ts # API calls for Unsplash (fetch, search, etc.)
│
├── store/
│ └── useSearchHistory.ts # Zustand store for search history persistence
│
├── types/
│ └── popularImage.ts # Type definitions for Unsplash photo data
│
├── utils/
│ └── timeAgo.ts # Helper for converting timestamps to "x minutes ago"
│
├── App.tsx # Root component with layout setup
├── AppLayout.tsx # Global layout wrapper
├── index.tsx # React entry point
├── main.tsx # Application mount and provider setup
└── index.css # Global styles
