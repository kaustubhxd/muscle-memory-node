
import expressAsyncHandler from 'express-async-handler'
import exerciseClient from '../config/exerciseClient.js'
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
    if (!isConsistent && (repList.length !== sets)) {
      res.status(500).json({ message: 'Sets are declared variant but reps & weights do not match the number of sets.' })
    }

    const reps = repList.map(({ reps }) => reps).join()
    const weight = repList.map(({ weight }) => weight).join()

    console.log({ reps, weight })

    await trx('exercise_log')
      .insert({
        user_id: 0,
        name,
        sets,
        is_consistent: isConsistent,
        reps,
        weight
      })
    trx.commit()

    res.status(200).json({ message: 'Exercise logged' })
  } catch (e) {
    trx.rollback()
    res.status(500).json({ message: 'Error logging exercise', error: e })
  }
})

const getExerciseLog = expressAsyncHandler(async (req, res) => {
  const { date } = req.query

  const userId = 0

  try {
    const response = await
    knexPgInstance('exercise_log')
      .select('id',
        'name',
        'sets',
        'is_consistent',
        'reps',
        'weight',
        'created_on')
      .where('user_id', userId)
      .where(knexPgInstance.raw(`created_on::date = date '${date}'`))
      .orderBy('created_on', 'desc')

    res.status(200).json(response)
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

const deleteExerciseLog = expressAsyncHandler(async (req, res) => {
  const { id } = req.query

  try {
    const response = await
    knexPgInstance('exercise_log')
      .where('id', id).del()

    res.status(200).json(response)
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

export {
  getExercise,
  postLogExercise,
  getExerciseLog,
  deleteExerciseLog
}
