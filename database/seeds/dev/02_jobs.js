exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("jobs")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("jobs").insert([
        {
          position: "Web Developer",
          company: "Google",
          status: "Ghosted",
          date_applied: "01/22/2020",
          point_of_contact: "Johnnie Pnuemonic",
          poc_email: "john@mail.com",
          poc_phone: "555-555-5555",
          location: "Brooklyn, NY",
          notes: "Lorem ipsum dolor sit amet, consectetur adipis",
          user_id: 1
        },
        {
          position: "UI Developer",
          company: "Google",
          status: "In Person Interview",
          date_applied: "12/22/2019",
          point_of_contact: "Billy Blanks",
          poc_email: "billy@mail.com",
          poc_phone: "555-555-5555",
          location: "Brooklyn, NY",
          notes: "Lorem ipsum dolor sit amet",
          user_id: 2
        },
        {
          position: "Backend Developer",
          company: "Google",
          status: "Phone Interview",
          date_applied: "11/22/2019",
          point_of_contact: "Johnnie Knoxville",
          poc_email: "john@mail.com",
          poc_phone: "555-555-5555",
          location: "Brooklyn, NY",
          notes: "Lorem ipsum dolor sit ametn",
          user_id: 2
        }
      ]);
    });
};
