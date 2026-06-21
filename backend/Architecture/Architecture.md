For your project report and viva, I'd present the architecture like this:

                    ┌─────────────────────┐
                    │   React Frontend    │
                    │  Search Interface   │
                    └──────────┬──────────┘
                               │
                               │ HTTP Requests
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │     Node.js API     │
                    └──────────┬──────────┘
                               │
           ┌───────────────────┼───────────────────┐
           │                   │                   │
           ▼                   ▼                   ▼

 ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
 │  GET /suggest  │  │  POST /search  │  │ GET /trending  │
 └───────┬────────┘  └───────┬────────┘  └───────┬────────┘
         │                   │                   │
         │                   ▼                   │
         │          ┌────────────────┐           │
         │          │ Batch Writer   │           │
         │          │ Search Buffer  │           │
         │          └───────┬────────┘           │
         │                  │                    │
         │                  ▼                    ▼
         │          ┌───────────────────────────────┐
         │          │ Redis Sorted Set              │
         │          │ query_counts                  │
         │          └───────────────────────────────┘
         │
         ▼
 ┌────────────────┐
 │ Cache Layer    │
 │ (Cache Aside)  │
 └───────┬────────┘
         │
    Hit? │
         │
   ┌─────┴─────┐
   │           │
 YES          NO
   │           │
   ▼           ▼
Return      Trie Search
Cached      (Prefix Lookup)
Result         │
               ▼
      Store Result in Cache
               │
               ▼
        Return Suggestions


Additional Components
────────────────────────────────────────

┌────────────────────────────┐
│ Consistent Hashing         │
│ cache-node-1              │
│ cache-node-2              │
│ cache-node-3              │
└─────────────┬──────────────┘
              │
              ▼
     GET /cache/debug

┌────────────────────────────┐
│ Metrics Service            │
│ cacheHits                  │
│ cacheMisses                │
│ hitRate                    │
└─────────────┬──────────────┘
              │
              ▼
        GET /metrics

┌────────────────────────────┐
│ Dataset Loader             │
│ queries.csv                │
└─────────────┬──────────────┘
              │
              ▼
            Trie
              │
              ▼
     Redis Initial Load
Short Viva Explanation

The frontend communicates with an Express backend. Suggestions are served through a cache-aside layer backed by a Trie for fast prefix lookup. Query frequencies are stored in Redis Sorted Sets. Search requests are buffered and periodically flushed using a batch writer, resulting in eventual consistency. Consistent hashing distributes cached prefixes across logical cache nodes, while metrics track cache hit rate and performance.