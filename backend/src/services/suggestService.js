function getSuggestions(prefix, trie) {
  if (!prefix || prefix.trim() === "") {
    return [];
  }

  return trie.search(prefix);
}

module.exports = {
  getSuggestions,
};