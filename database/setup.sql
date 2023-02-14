-- CREATE TABLE exercise_log
CREATE TABLE exercise_log (
	id serial PRIMARY KEY,
  user_id INT NOT NULL,
  exercise_id VARCHAR(100) NOT NULL,
	name VARCHAR ( 70 ) NOT NULL,
	sets INT NOT NULL,
	set_number INT NOT NULL,
	reps INT NOT NULL,
	weight DECIMAL NOT NULL,
	is_consistent BOOLEAN NOT NULL,         
	created_on TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_on TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Merge rows with same exercise_id and return all columns
SELECT exercise_id, 
array_to_string(array_agg(reps), ',') as reps, 
array_to_string(array_agg(weight), ',') as weight,
min(name) as name,
min(user_id) as user_id,
min(created_on) as created_on,
min(updated_on) as updated_on,
min(sets) as sets,
bool_or(is_consistent) as is_consistent
FROM exercise_log
GROUP BY exercise_id;