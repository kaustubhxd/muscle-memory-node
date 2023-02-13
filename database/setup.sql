-- CREATE exercise_log table
CREATE TABLE exercise_log (
	id serial PRIMARY KEY,
  user_id INT NOT NULL,
	name VARCHAR ( 70 ) NOT NULL,
	sets INT NOT NULL,
	set_number INT NOT NULL,
	reps INT NOT NULL,
	weight DECIMAL NOT NULL,
	is_consistent BOOLEAN NOT NULL,         
	created_on TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_on TIMESTAMP NOT NULL DEFAULT NOW()
);