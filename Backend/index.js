import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { AuthRouters } from './routers/auth.router.js'
import { connectDatabase } from './utils/initMongoose.js'

const app = express()

app.use(express.json())

app.use(cors())

dotenv.config()

// CONNECT TO MONGODB DATABASE SERVER
try {
  await connectDatabase()
} catch (err) {
  console.log(err)
  process.exit()
}

// CHECK SERVER HEALTH
app.get('/check', async (req, res) => {
  res.send('<h1>vudahy</h1>')
})

//AUTHENTICATION ROUTERS - LOGIN AND SIGNUP
app.use(AuthRouters)

app.listen(3005, () => {
  console.log(`Server running on port 3005`)
})
