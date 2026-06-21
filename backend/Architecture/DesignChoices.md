Design Choices & Trade-offs
Design Choice	Reason	Trade-off
Trie	Fast prefix lookup	More memory usage
Redis Sorted Set	Efficient ranking and trending	Data not durable without persistence
Batch Writes	Fewer Redis writes	Eventual consistency
Cache-Aside	Simple caching model	Stale cache possible
Consistent Hashing	Even cache distribution	Added routing complexity
In-Memory Cache	Very fast reads	Lost on restart