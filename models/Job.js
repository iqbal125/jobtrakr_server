const { Model } = require("objection");
const knex = require("../database/knex");

//Connecting our model to our database
Model.knex(knex);

class Job extends Model {
  static get tableName() {
    return "jobs";
  }

  static get relationMappings() {
    const User = require("./User");
    return {
      candidate: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "jobs.user_id",
          to: "users.id"
        }
      }
    };
  }
}

module.exports = Job;
