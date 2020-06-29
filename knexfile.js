require("dotenv").config();

console.log("KNEX FILE", process.env.DATABASE_HEROKU);
// Update with your config settings.
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds/dev"
    },
    useNullAsDefault: true
  },

  test: {
    client: "pg",
    connection: process.env.DATABASE_HEROKU,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds/dev"
    },

    useNullAsDefault: true
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds/production"
    },
    useNullAsDefault: true
  }
};
