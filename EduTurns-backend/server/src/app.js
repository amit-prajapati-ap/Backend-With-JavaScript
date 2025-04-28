import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '25kb'}))
app.use(express.static('public'))
app.use(express.urlencoded({limit: '25kb', extended: true}))
app.use(cookieParser())

//route import
import homeRouter from './routes/home.routes.js'

//route declaration
app.use("/api/v1/home", homeRouter)

export default app