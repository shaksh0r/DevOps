const redis = require('redis')

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
})

redisClient.on('connect',()=>{
    console.log('Connected to Redis')
})

redisClient.on('error',(error)=>{
    console.log('Redis connection error:',error)
})

module.exports = redisClient