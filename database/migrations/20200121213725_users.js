exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments("id").primary();
    tbl.string("email");
    tbl.string("username");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
