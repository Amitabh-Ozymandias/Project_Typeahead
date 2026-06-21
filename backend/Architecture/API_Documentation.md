API Documentation
GET /suggest

Request:

GET /suggest?q=iph

Response:

[
  {
    "query": "iphone",
    "count": 100000
  }
]
POST /search

Request:

POST /search
Content-Type: application/json

{
  "query": "iphone"
}

Response:

{
  "success": true,
  "message": "Search recorded"
}
GET /trending

Response:

[
  {
    "value": "chatgpt",
    "score": 120000
  }
]
GET /cache/debug

Request:

GET /cache/debug?prefix=iph

Response:

{
  "prefix": "iph",
  "assignedNode": "cache-node-1"
}
GET /metrics

Response:

{
  "cacheHits": 20,
  "cacheMisses": 5,
  "hitRate": "80.00%"
}