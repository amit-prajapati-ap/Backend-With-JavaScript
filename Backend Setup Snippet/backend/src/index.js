// //Approach 1 (DB Connection)
import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import app from './app.js'

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    
    app.on( "error" , (error) => {
        console.log("ERROR: ", error)
        throw error
    })

    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running at PORT: ${process.env.PORT}`)
    })

})
.catch(error => {
    console.log("MONGO DB Connection Failed !!", error)
})

// //Approach 2 (DB Connection)

// import mongoose from "mongoose"
// import {DB_NAME} from './constants'
// import express from 'express'
// const app = express()
// ;(async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("ERROR: ", error)
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log("App is listening at port: ", process.env.PORT)
//         })
//     } catch (error) {
//         console.log("ERROR: ", error)
//     }
// })()
