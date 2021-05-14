const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

console.log('database host', process.env.HOST)
const getTransactions = (query) => {
    console.log('query', query)
    return new Promise(function(resolve, reject) {
      pool.query(query, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  
  module.exports = {
    getTransactions
  }