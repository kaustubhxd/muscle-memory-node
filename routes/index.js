import express from 'express'
import { getServerStatus } from '../controllers/_exerciseController.js'
import exerciseRoute from './v1/exerciseRoute.js'
const router = express.Router()

router.use('/v1/exercise', exerciseRoute)

router.get(
  '/',
  getServerStatus
)

export default router
