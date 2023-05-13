const mongoose=require('mongoose')

const todoschema=new mongoose.Schema({
    item:{type:String}
},{
    timestamps:true
})

const Todo=mongoose.model("item",todoschema)

module.exports=Todo