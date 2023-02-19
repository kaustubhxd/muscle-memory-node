import express from 'express'
import indexRouter from './routes/index.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

const corsWhitelist = ['http://localhost:3000', 'kaustubhxd.github.io/muscle-memory']
const corsOptions = {
  origin: (origin, callback) => {
    if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use('/', indexRouter)

app.listen(4000, () =>
  console.log('App listening on port 4000!')
)
