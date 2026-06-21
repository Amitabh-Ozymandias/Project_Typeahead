let cacheHits = 0;
let cacheMisses = 0;

function recordHit() {
  cacheHits++;
}

function recordMiss() {
  cacheMisses++;
}

function getMetrics() {
  const total = cacheHits + cacheMisses;

  return {
    cacheHits,
    cacheMisses,
    hitRate:
      total === 0
        ? "0%"
        : ((cacheHits / total) * 100).toFixed(2) + "%",
  };
}

module.exports = {
  recordHit,
  recordMiss,
  getMetrics,
};