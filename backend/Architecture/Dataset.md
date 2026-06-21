## Dataset

The project uses a CSV dataset containing:

query,count

Example:

iphone,100000

iphone 15,85000

chatgpt,120000

java tutorial,40000

### Loading Process

1. Dataset is read using datasetLoader.js
2. Queries are inserted into the Trie
3. Queries are loaded into Redis Sorted Set (query_counts)
4. Application starts serving requests

### Dataset Structure

query,count

chatgpt,120000

iphone,100000

java tutorial,40000

...

The submission includes a synthetic dataset containing over 100,000 search queries to simulate production-scale workloads.
