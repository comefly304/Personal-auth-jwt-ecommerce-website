const todorouter=require('express').Router();
const Todo=require('../models/todo')

//post todo
todorouter.post("/api/todo",async(req,res)=>{
    try{
const{item}=req.body;
    const newitem=new Todo({
        item
    })
    await newitem.save()
    return res.status(200).json({
        success:true,
        newitem
    })

    }catch(err){
        return res.status(400).send(err)
    }
})

//get
todorouter.get("/api/todos",async(req,res)=>{
    try{
        const getitems=await Todo.find()
        return res.status(200).json({
            success:true,
            getitems
        })

    }catch(err){
        return res.status(400).send(err)
    }
})


//update
todorouter.put("/api/todo/:id",async(req,res)=>{
    try{
    const updatetodo=await Todo.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true})
   return res.status(200).json({
    success:true,
    updatetodo
   })
    }catch(err){
        return res.status(400).send(err)
    }
})

//delete
todorouter.delete("/api/todo/:id",async(req,res)=>{
    try{
      await Todo.findByIdAndDelete(req.params.id)
        return res.json({
            success:true,
            msg:'item deleted'
        })
        
    }catch(err){
        return res.status(400).send(err)
    }
})

module.exports=todorouter