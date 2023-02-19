import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import exerciseRoute from './v1/exerciseRoute.js'
const router = express.Router()

// Check if server is online
router.get(
  '/v1',
  expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Server online' })
  })
)

// Routes
router.use('/v1/exercise', exerciseRoute)

export default router
