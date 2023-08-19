require("dotenv").config() 
//to make private some sensitive data likle port and all in the .env file and npm install dotenv
const express = require("express")
const mongoose = require("mongoose") //to connect our project to database
const workoutRouter = require("./routes/workout")
const userRouter = require('./routes/user')

//express app
const app = express()
//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path,req.method)
    next()
})

//connnect to db
mongoose.connect(process.env.MONGO_URI)//once it is connected then and only then we will request
.then(() => {
    app.listen(process.env.PORT, () => {       //process.env.whatever u have written in ur .env file
        console.log("successfully connected to db and listening to the server on port 3000 !!!")
    })
})
.catch((error) => {
    console.log(error)
})

//routing
app.use('/api/workout' ,workoutRouter) //bcoz hm ek hi file m sara nhi likhna chahte islie routers ki alg se file bna li
app.use('/api/user' ,userRouter)




