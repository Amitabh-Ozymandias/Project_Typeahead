const TrieNode = require("./TrieNode");

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(query, count) {
    let node = this.root;

    query = query.toLowerCase();

    for (const ch of query) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }

      node = node.children[ch];

      node.suggestions.push({
        query,
        count,
      });

      node.suggestions.sort((a, b) => b.count - a.count);

      if (node.suggestions.length > 10) {
        node.suggestions.pop();
      }
    }

    node.isEnd = true;
  }

  search(prefix) {
    let node = this.root;

    prefix = prefix.toLowerCase();

    for (const ch of prefix) {
      if (!node.children[ch]) {
        return [];
      }

      node = node.children[ch];
    }

    return node.suggestions;
  }
}

module.exports = Trie;