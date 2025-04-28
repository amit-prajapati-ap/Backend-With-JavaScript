import 'dotenv/config'
import app from './app.js'
import { connectDB } from './db/config.js'

connectDB()
.then(()=> {
    app.on("error", (error)=> {
        console.log("Error in Index File: ", error)
        throw error
    })
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server is running port number: ", process.env.PORT)
    })
})
.catch(error => {
    console.log("MongoDB Connection failed in Index File !!", error)
})