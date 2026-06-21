const fs = require("fs");
const csv = require("csv-parser");

function loadDataset(filePath, trie) {

  return new Promise((resolve, reject) => {

    const queries = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {

        const query = row.query;
        const count = Number(row.count);

        trie.insert(query, count);

        queries.push({
          query,
          count
        });

      })
      .on("end", () => {

        console.log(`Loaded ${queries.length} queries`);

        resolve(queries);

      })
      .on("error", reject);

  });

}

module.exports = loadDataset;