// Normalize different possible API response shapes into arrays/objects we render.

export function normalizeSuggestions(data) {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data.map((x) => (typeof x === "string" ? x : x.query || x.text || ""));
  }
  if (Array.isArray(data.suggestions)) return normalizeSuggestions(data.suggestions);
  if (Array.isArray(data.results)) return normalizeSuggestions(data.results);
  return [];
}

export function normalizeMetrics(data) {
  if (!data) return { hits: 0, misses: 0, rate: 0 };
  const hits = data.cacheHits ?? data.hits ?? data.cache_hits ?? 0;
  const misses = data.cacheMisses ?? data.misses ?? data.cache_misses ?? 0;
  const total = hits + misses;
  const rate =
    data.hitRate ?? data.cacheHitRate ?? (total > 0 ? (hits / total) * 100 : 0);
  return { hits, misses, rate: Number(rate).toFixed(2) };
}

export function normalizeTrending(data) {
  const list = Array.isArray(data) ? data : data?.trending || data?.results || [];
  return list.map((item, i) => ({
    rank: item.rank ?? i + 1,
    query: item.query ?? item.text ?? item.q ?? "",
    count: item.count ?? item.searches ?? item.score ?? 0,
  }));
}

export function normalizeDebug(data) {
  if (!data) return { prefix: "", node: "", nodes: [] };
  return {
    prefix: data.prefix ?? "",
    node: data.assignedNode ?? data.node ?? data.cacheNode ?? "",
    nodes: data.nodes ?? data.allNodes ?? ["Cache-1", "Cache-2", "Cache-3", "Cache-4"],
  };
}
