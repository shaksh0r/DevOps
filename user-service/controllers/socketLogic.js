const redisClient = require('../config/redis')

module.exports = function(io){
    io.on('connection',(socket)=>{
        socket.emit('on','You are connected')
        console.log('Inside socket connection')
        
        redisClient.set('socketId',socket.id)
        socket.broadcast.emit('newUser',socket.id)
        console.log('User connected with id:',socket.id)

        socket.on('disconnect',()=>{
           redisClient.del('socketId')
            socket.broadcast.emit('userDisconnected',socket.id)
            console.log('User disconnected with id:',socket.id)
        })
    })
}