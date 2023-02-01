import knex from 'knex'
import config from '../knexfile.js'

const connection = knex(config);

connection.raw("SHOW DATABASES").then(function () {
  console.log("connected to db successfully");
});

export default connection;