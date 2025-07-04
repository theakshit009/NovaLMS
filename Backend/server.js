import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mogodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import mentorRouter from './routes/mentorRoutes.js'
import {clerkMiddleware} from '@clerk/express'
import { connectCloudiary } from './config/cloudinary.js'
import courseRouter from './routes/courseRoutes.js'
import usertRouter from './routes/userRoutes.js'

const app = express()

await connectDb()
await connectCloudiary()

app.use(cors())
app.use(clerkMiddleware())

app.get('/', (req, res) => {
    res.send("API Working")
})
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/mentor', express.json(), mentorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), usertRouter)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

const PORT = process.env.PORT || 5090

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT} successfully`)
})