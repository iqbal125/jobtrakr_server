exports.up = function(knex) {
  return knex.schema.createTable("jobs", tbl => {
    tbl.increments("id");
    tbl.string("position");
    tbl.string("company");
    tbl.string("status");
    tbl.string("date_applied");
    tbl.string("point_of_contact");
    tbl.string("poc_email");
    tbl.string("poc_phone");
    tbl.string("location");
    tbl.text("notes");
    tbl
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("jobs");
};
