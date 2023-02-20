import express from 'express'
import validate from '../../middlewares/validate.js'
import { deleteExerciseLog, getExercise, getExerciseLog, postLogExercise } from '../../controllers/_exerciseController.js'
import { getExerciseValidate } from '../../validations/exerciseValidate.js'

const router = express.Router()

// GET
router.get(
  '/',
  validate(getExerciseValidate),
  getExercise
)
router.get(
  '/exercise-log',
  getExerciseLog
)

// POST
router.post('/log-exercise', postLogExercise)

// DELETE
router.delete('/log-delete', deleteExerciseLog)

export default router
