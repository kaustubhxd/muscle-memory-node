
import expressAsyncHandler from 'express-async-handler'
import exerciseClient from '../config/exerciseClient.js'
import { v4 as uuidv4 } from 'uuid'
import knexPgInstance from '../config/knexInstance.js'

const getExercise = expressAsyncHandler(async (req, res) => {
  const { search } = req.query

  try {
    const response = await exerciseClient.get('', { params: { name: search } })

    res.status(200).json(response.data)
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

const postLogExercise = expressAsyncHandler(async (req, res) => {
  const { name, isConsistent, sets, repList } = req.body
  const trx = await knexPgInstance.transaction()

  try {
    const exerciseId = uuidv4()
    await Promise.all(
      repList.map(async ({ reps, weight }, index) => {
        await trx('exercise_log')
          .insert({
            user_id: 0,
            name,
            exercise_id: exerciseId,
            sets,
            is_consistent: isConsistent,
            set_number: index + 1,
            reps,
            weight
          })
      })
    )
    trx.commit()

    res.status(200).json({ message: 'Exercise logged' })
  } catch (e) {
    trx.rollback()
    res.status(500).json({ message: 'Error logging exercise', error: e })
  }
})

const getExerciseLog = expressAsyncHandler(async (req, res) => {
  const { date } = req.query

  try {
    const response = await
    knexPgInstance('exercise_log')
      .select('exercise_id',
        knexPgInstance.raw("array_to_string(array_agg(id), ',') as id"),
        knexPgInstance.raw("array_to_string(array_agg(reps), ',') as reps"),
        knexPgInstance.raw("array_to_string(array_agg(weight), ',') as weight"),
        knexPgInstance.raw('min(name) as name'),
        knexPgInstance.raw('min(user_id) as user_id'),
        knexPgInstance.raw('min(created_on) as created_on'),
        knexPgInstance.raw('min(updated_on) as updated_on'),
        knexPgInstance.raw('min(sets) as sets'),
        knexPgInstance.raw('bool_or(is_consistent) as is_consistent'))
      .groupBy('exercise_id')
      .where(knexPgInstance.raw(`created_on::date = date '${date}'`))
      .orderBy('created_on', 'desc')

    res.status(200).json(response)
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

export {
  getExercise,
  postLogExercise,
  getExerciseLog
}
