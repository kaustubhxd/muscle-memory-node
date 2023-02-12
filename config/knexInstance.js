const knex = require('knex')

const knexInstance = knex({
  client: 'mysql2',
  connection: {
    host: process.env.MYSQL_URL,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    dateStrings: true,
    supportBigNumbers: true
    // bigNumberStrings: true
  },
  pool: { min: 0, max: 7 },
  acquireConnectionTimeout: 10000,
  debug: true,
  asyncStackTraces: true,
  // postProcessResponse: (result, queryContext) => convertToCamel(result)
});

export default knexInstance;
