const registerRouter=require('express').Router()
const User=require('../models/user')
const bcrypt=require('bcrypt')

//register post
registerRouter.post("/api/register",async(req,res)=>{
    try{
     const {firstname,lastname,email,password}=req.body
     const user=await User.findOne({email})
     if(user){
        return res.json("user in this email id is already registered")
     }
     const hash= await bcrypt.hash(password,10)
     const newuser=new User({
        firstname,
        lastname,
        email,
        password:hash
     })
     await newuser.save()
     return res.status(200).json({
        success:true,
        msg:"user registred",
        user:newuser
     })
    }catch(err){
        return res.send(err)
    }
})

registerRouter.get("/api/get",async(req,res)=>{
   try{
      const user=await User.find()
      return res.status(201).json(user)
      
   }catch(err){
      return res.status(401).json("server error")
   }
})

module.exports=registerRouter