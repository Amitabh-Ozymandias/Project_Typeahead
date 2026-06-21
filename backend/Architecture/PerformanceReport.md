# Performance Report

## Latency

Trie-based prefix search provides O(length(prefix)) lookup complexity.

Typical local response time:

* Suggest API: < 10 ms
* Cache Hit: < 5 ms
* Trending API: < 10 ms

## Cache Hit Rate

Metrics endpoint tracks:

* Cache Hits
* Cache Misses
* Cache Hit Rate

Example:

Cache Hits: 80

Cache Misses: 20

Hit Rate: 80%

## Write Reduction

Without batching:

100 searches = 100 Redis writes

With batching:

100 searches → aggregated buffer → significantly fewer Redis operations

Benefits:

* Reduced write amplification
* Lower Redis load
* Better throughput

## Scalability

The system supports:

* Distributed cache routing
* Prefix-based indexing
* High-frequency search workloads

through Trie indexing and Redis storage.
