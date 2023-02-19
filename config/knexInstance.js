import knex from 'knex'
import pg from 'pg'
import { knexSnakeCaseMappers } from 'objection'

// https://stackoverflow.com/a/51085796 (knex-silently-converts-postgres-timestamps-with-timezone-and-returns-incorrect-t)
const { types } = pg
const TIMESTAMPTZ_OID = 1184
const TIMESTAMP_OID = 1114
types.setTypeParser(TIMESTAMPTZ_OID, val => val)
types.setTypeParser(TIMESTAMP_OID, val => val)

const knexPgInstance = knex({
  client: 'pg',
  connection: {
    host: `${process.env.POSTGRES_HOST}`,
    database: `${process.env.POSTGRES_DB}`,
    user: `${process.env.POSTGRES_USER}`,
    password: `${process.env.POSTGRES_PASSWORD}`,
    dateStrings: true,
    supportBigNumbers: true
  },
  // typeCast:formatTimestamp,
  searchPath: 'public',
  pool: { min: 0, max: 20 },
  // acquireConnectionTimeout: 10000,
  debug: true,
  asyncStackTraces: true,
  // postProcessResponse: (result, queryContext) => convertToCamel(result),
  ...knexSnakeCaseMappers()
})

export default knexPgInstance
