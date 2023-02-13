/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const path = require("path");
const knex = require("knex");
const axios = require("axios")

const knexPgInstance = knex({
  client: 'pg',
  connection: {
    host: `${process.env.POSTGRES_HOST}`,
    database: `${process.env.POSTGRES_DB}`,
    user: `${process.env.POSTGRES_USER}`,
    password: `${process.env.POSTGRES_PASSWORD}`,
    dateStrings: true,
    supportBigNumbers: true
  },
  // typeCast:formatTimestamp,
  searchPath: 'public',
  pool: { min: 0, max: 20 },
  acquireConnectionTimeout: 10000,
  debug: true,
  asyncStackTraces: true,
  // postProcessResponse: (result, queryContext) => convertToCamel(result),
});

const EXERCISES_URL = "https://api.api-ninjas.com/v1/exercises"
const NINJA_EXERCISES_API_KEY = process.env.NINJA_EXERCISES_API_KEY

const client = axios.create({
    baseURL: EXERCISES_URL,
    // timeout: 1000,
    headers: {'X-Api-Key': NINJA_EXERCISES_API_KEY}
});


// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

const cors_allow = [
  'kaustubhxd.github.io/muscle-memory/',
  'localhost'
]

fastify.register(require('@fastify/cors'), { 
  origin: (origin, cb) => {
  const hostname = new URL(origin).hostname
  if(cors_allow.includes(hostname)){
    //  Request from localhost will pass
    cb(null, true)
    return 
  }
  // Generate an error on other origins, disabling access
  cb(new Error("Not allowed"), false)
}
})

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// Formbody lets us parse incoming forms
fastify.register(require("@fastify/formbody"));

fastify.get("/exercise", async (request, reply) => {
  
  const { name } = request.query;
    
  if(!name){
    reply
      .code(500)
      .send({message: 'Parameter not passed'})
  }
  
  try{
    const response = await client.get('', { params: {name} })
    return reply
      .code(200)
      .send(response.data)
  }catch(e) {
      return reply
        .code(404)
        .send(e)
  }
    
});

fastify.get("/", async (request, reply) => {
  return reply
      .code(200)
      .send({message: 'Server online'})}
);

fastify.post("/log-exercise", async (request, reply) => {
  
  const {name, isConsistent: is_consistent, sets, repList} = request.body
  
  await Promise.all(
    repList.map(async ({reps, weight}, index) => {
      await knexPgInstance('exercise_log')
              .insert({
                user_id: 0,
                name,
                sets,
                is_consistent,
                set_number: index + 1,
                reps,
                weight
              })
    })
  );
  
  return reply
    .code(200)
    .send({message: 'Exercise logged'})

});

fastify.get("/exercise-log", async (request, reply) => {
  
  const response = await knexPgInstance('exercise_log')
  
  return reply
    .code(200)
    .send({response})

});




/**
 * Our POST route to handle and react to form submissions
 *
 * Accepts body data indicating the user choice
 */
fastify.post("/", function (request, reply) {
  
});

// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
