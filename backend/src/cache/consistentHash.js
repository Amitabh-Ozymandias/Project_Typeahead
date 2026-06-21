const cacheNodes = [
  "cache-node-1",
  "cache-node-2",
  "cache-node-3",
];

function hash(str) {
  let hashValue = 0;

  for (let i = 0; i < str.length; i++) {
    hashValue =
      (hashValue * 31 + str.charCodeAt(i)) >>> 0;
  }

  return hashValue;
}

function getNode(key) {
  const index =
    hash(key) % cacheNodes.length;

  return cacheNodes[index];
}

module.exports = {
  getNode,
  cacheNodes,
};