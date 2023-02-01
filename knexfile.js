module.exports = {
    client: 'mysql2',
    connection: { 
        host : '127.0.0.1',
        port : 3306,
        user : 'next',
        password : 'next',
        database : 'nextapp'
    },
    migrations: {
        directory: './knex/migrations',
      },
      seeds: {
        directory: './knex/seeds',
      },
  };