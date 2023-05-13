const express=require('express')
const cors=require('cors')
const Connection = require('./config/db')
require('dotenv').config()
const rRouter=require('./routes/user')
const loginRouter = require('./auth/login')
const todorouter = require('./routes/todo')
const app=express()


app.use(express.json())
app.use(cors({origin:"http://localhost:3000"}))
app.use("/",rRouter)
app.use("/",loginRouter)
app.use("/",todorouter)



const PORT=process.env.PORT || 8900
app.listen(PORT,()=>{
    Connection()
    console.log(`server is running in port ${PORT}`)
})