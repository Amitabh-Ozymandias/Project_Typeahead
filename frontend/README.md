# Distributed Typeahead Search Engine — Frontend

Modern React frontend for a distributed typeahead search platform powered by Trie + Redis Cache + Consistent Hashing.

## Stack

- React 18 + Vite
- Tailwind CSS (dark mode)
- Axios
- Framer Motion
- Lucide React icons
- React Hot Toast

## Setup

```bash
cp .env.example .env
# edit VITE_API_BASE_URL
npm install
npm run dev
```

## API Endpoints used

- `GET  ${VITE_API_BASE_URL}/suggest?q=<text>`
- `POST ${VITE_API_BASE_URL}/search`  body: `{ "query": "..." }`
- `GET  ${VITE_API_BASE_URL}/trending`
- `GET  ${VITE_API_BASE_URL}/metrics`
- `GET  ${VITE_API_BASE_URL}/cache/debug?prefix=<text>`

## Features

- Debounced autocomplete (300ms) with keyboard nav
- Recent searches in localStorage + history dropdown
- Cache analytics cards (animated)
- Trending leaderboard (auto-refreshing every 10s)
- Consistent hashing visualizer
- Dark / light theme toggle
- Toast notifications
- Fully responsive
