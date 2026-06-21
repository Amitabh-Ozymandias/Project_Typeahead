# Distributed Typeahead Search System

## Overview

This project implements a distributed typeahead search system similar to search suggestions used by Google, Amazon, and other search platforms.

The system provides:

* Prefix-based search suggestions
* Trending searches
* Redis-backed query frequency storage
* Distributed caching using consistent hashing
* Cache hit/miss analytics
* Batch write processing
* Trie-based indexing for low-latency lookups

---

## Architecture

Frontend (React)
↓
Express Backend
↓
Cache Layer (Cache-Aside)
↓
Trie Search Index
↓
Redis Sorted Sets

---

## Features

### Typeahead Suggestions

Returns up to 10 suggestions matching a given prefix.

### Search Submission

Records user searches and updates query popularity.

### Trending Searches

Displays the most popular search queries based on frequency.

### Distributed Cache

Uses consistent hashing to distribute cache ownership across logical cache nodes.

### Cache Analytics

Tracks:

* Cache Hits
* Cache Misses
* Cache Hit Rate

### Batch Writes

Search updates are buffered and flushed periodically to Redis, reducing write pressure.

---

## Tech Stack

Frontend:

* React
* Vite
* Axios

Backend:

* Node.js
* Express.js

Storage:

* Redis

Data Structures:

* Trie

---

## Setup Instructions

### Backend

```bash
cd backend
npm install
npm run dev
```

### Redis

Start Redis server locally:

```bash
redis-server
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

GET /suggest?q=<prefix>

POST /search

GET /trending

GET /cache/debug?prefix=<prefix>

GET /metrics

---

## Consistency Model

Eventual Consistency

Searches are buffered and written to Redis periodically through batch processing.

---

## Cache Strategy

Cache-Aside (Lazy Loading)

Requests first check cache before falling back to Trie search.

---

## Author

Amitabh Panda
