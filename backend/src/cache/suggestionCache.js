const cache = new Map();

function get(prefix) {
  return cache.get(prefix);
}

function set(prefix, suggestions) {
  cache.set(prefix, suggestions);
}

function has(prefix) {
  return cache.has(prefix);
}

module.exports = {
  get,
  set,
  has,
};