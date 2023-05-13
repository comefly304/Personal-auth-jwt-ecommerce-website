const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const userschema=new mongoose.Schema({
    firstname:{type:String,require:true},
    lastname:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
},{
    timestamps:true
})

userschema.methods.generatetoken=function(){
    const token=jwt.sign({userId:this._id},process.env.JWTSECRET,{expiresIn:"7d"})
    return token
}

const User=mongoose.model("form-auth-2-may",userschema)

module.exports=User