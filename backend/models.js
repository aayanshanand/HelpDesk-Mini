const db = require('./db');

// Helper to run queries with Promise
function run(query, params = []) {
  return new Promise((resolve, reject) =>
    db.run(query, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    })
  );
}

function all(query, params = []) {
  return new Promise((resolve, reject) =>
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    })
  );
}

function get(query, params = []) {
  return new Promise((resolve, reject) =>
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    })
  );
}

module.exports = { run, all, get, db };