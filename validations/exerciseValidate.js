import Joi from 'joi'

// @desc Get exercise name
const getExerciseValidate = {
  query: Joi.object({
    search: Joi.string()
  })
}

export {
  getExerciseValidate
}
