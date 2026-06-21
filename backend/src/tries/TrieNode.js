class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
    this.suggestions = [];
  }
}

module.exports = TrieNode;