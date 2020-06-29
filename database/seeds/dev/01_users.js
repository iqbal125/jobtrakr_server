exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, email: "mock@email.com", username: "username" },
        { id: 2, email: "mock2@email.com", username: "username" },
        { id: 3, email: "mock3@email.com", username: "username" }
      ]);
    });
};
