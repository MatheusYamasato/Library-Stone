import cors from 'cors'
import express, { Application } from 'express'

const criar = async () => {
  const app: Application = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cors())

  return app
}

export default { criar }
