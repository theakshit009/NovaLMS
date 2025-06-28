import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mogodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

const app = express()

await connectDb()

app.use(cors())

app.get('/', (req, res) => {
    res.send("API Working")
})
app.post('/clerk', express.json(), clerkWebhooks)

const PORT = process.env.PORT || 5090

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT} successfully`)
})