require('dotenv').config()
const http = require('http')
const socketIo = require('socket.io')
const express = require('express')
const mongoose = require('mongoose')
const authenticationRouter = require('./routes/authenticationRoute')
const userRouter = require('./routes/userRoutes')
const socketConnection = require('./controllers/socketLogic')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)
app.use(express.json())


const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI)


app.use('/auth',authenticationRouter)
app.use('/user',userRouter)
app.get('/',(req,res)=>{
    res.send('Hello World')
})
socketConnection(io)

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})



