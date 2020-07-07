
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255),
);


CREATE TABLE jobs (
  jid SERIAL PRIMARY KEY,
  position VARCHAR(255),
  company VARCHAR(255),
  status VARCHAR(255),
  date_applied VARCHAR(255),
  point_of_contact VARCHAR(255),
  poc_email VARCHAR(255),
  poc_phone VARCHAR(255),
  location VARCHAR(255),
  notes VARCHAR,
  user_id INT REFERENCES users(id)
);