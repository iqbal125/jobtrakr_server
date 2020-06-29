const { Model } = require("objection");
const knex = require("../database/knex");

//Connect model to our database
Model.knex(knex);


class User extends Model {
  static get tableName() {
    return "users";
  }
  static get relationMappings() {
    //Job Model
    const Jobs = require("./Job");
    return {
      jobs: {
        relation: Model.HasManyRelation,
        modelClass: Jobs,
        join: {
          from: "users.id",
          to: "jobs.user_id"
        }
      }
    };
  }
}

module.exports = User;
