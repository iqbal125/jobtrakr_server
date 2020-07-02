// Creating Connection to the DB with KNEX
require("dotenv").config()
//SET UP ENVIRONMENT
const environment = process.env.NODE_ENV || "development"
//Retrieving the Configuration recieved from the knexfile
const config = require("./knexfile")[environment]
//Exporting the Connection with KNEX with the Configuration
module.exports = require("knex")(config)
