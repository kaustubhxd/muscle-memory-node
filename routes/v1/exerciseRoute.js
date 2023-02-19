import express from 'express'
import validate from '../../middlewares/validate.js'
import { getExercise, getExerciseLog, getServerStatus, postLogExercise } from '../../controllers/_exerciseController.js'
import { getExerciseValidate } from '../../validations/exerciseValidate.js'

const router = express.Router()

// GET
router.get(
  '/status',
  getServerStatus
)
router.get(
  '/',
  validate(getExerciseValidate),
  getExercise
)
router.get(
  '/exercise-log',
  getExerciseLog
)

router.post('/log-exercise', postLogExercise)

export default router
