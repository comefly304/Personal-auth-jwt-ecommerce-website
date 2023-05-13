const loginRouter=require('express').Router()
const User=require('../models/user')
const bcrypt=require('bcrypt')

//register post
loginRouter.post("/api/login",async(req,res)=>{
    try{
     const {email,password}=req.body
     const user=await User.findOne({email})
     if(user){
        // return res.json("user in this email id is already registered")
       await bcrypt.compare(password,user.password,function(err,result){
        if(err){
            return res.send(err)
        }if(result){
            const {password,...others}=user._doc
            const token=user.generatetoken()
            return res.status(201).json({
                success:true,
                token:token,
                msg:"login successful",
                user:others
            })
        }
       }) 
     }
    }catch(err){
        return res.send(err)
    }
})

module.exports=loginRouter