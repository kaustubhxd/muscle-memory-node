import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const EXERCISES_URL = 'https://api.api-ninjas.com/v1/exercises'
const NINJA_EXERCISES_API_KEY = process.env.NINJA_EXERCISES_API_KEY

const client = axios.create({
  baseURL: EXERCISES_URL,
  // timeout: 1000,
  headers: { 'X-Api-Key': NINJA_EXERCISES_API_KEY }
})

export default client
