//allows pool.js to use pg
const pg = require('pg')

//sets up connection to the database
const config = ({
  database: 'to-do-app',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
});

//sets up pool used to communicate with database
const pool = new pg.Pool(config);

//the following two functions log whether the connection was successful of the error
//if it was not
pool.on('connect', () => {
  console.log('Connected to postgresql');
});

pool.on('error', error => {
  console.log('Error connecting to postgresql');
});

//exports the pool so it can be used by server.js
module.exports = pool;