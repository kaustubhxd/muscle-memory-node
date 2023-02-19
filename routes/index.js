import express from 'express'
import exerciseRoute from './v1/exerciseRoute.js'
const router = express.Router()

router.use('/v1/exercise', exerciseRoute)

export default router
