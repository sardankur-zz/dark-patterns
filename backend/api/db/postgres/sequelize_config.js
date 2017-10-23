/*eslint no-undef: "error"*/
/*eslint-env node*/

var sequelizeLogger = require('sequelize-log-syntax-colors')

module.exports = {
  development: {
    username: process.env.PGUSER || 'postgres',
    password: 'postgres',
    database: 'userstudy_dev',
    host: process.env.PG_HOST || 'localhost',
    dialect: 'postgres',
    logging: sequelizeLogger
  },
  test: {
    username: process.env.PGUSER || 'postgres',
    password: 'postgres',
    database: 'userstudy_dev',
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.PGUSER || 'postgres',
    password: 'postgres',
    database: 'userstudy_production',
    host: process.env.PG_HOST || 'userstudy_db',
    port: process.env.PG_PORT || 5432,
    dialect: 'postgres',
    logging: false
  }
}
