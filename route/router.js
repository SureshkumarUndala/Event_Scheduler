const express = require("express")
const eventModel = require("../models/schema")
const Router = express.Router()




//create event
Router.use(express.json())
Router.post("/", async(req,res)=>{
    const{ title, description, location, startTime, endTime} = req.body
    try{
        if(!title || !description || !location || !startTime || !endTime){
            return res.status(400).json({
                error:"Validation Error"
            })
        }
        const newEvent = await eventModel.create(req.body)
        res.status(201).json(newEvent)
       


    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }

})


//list all events
Router.get("/", async(req,res)=>{
    try{
        const allEvents = await eventModel.find()
        res.status(200).json(allEvents)

    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }
})

//get a specific Event
Router.get("/:id", async(req,res)=>{
    const {id}= req.params
    try{
        const specificEvent = await eventModel.findById({_id:id})
        console.log(specificEvent)
        
        if(!specificEvent){
            return res.status(404).json({
                error:"There is no event with this id"})

        }

        res.status(200).json(specificEvent)
    }

    catch(err){
        res.status(500).json({
            error:err
        })
    }
})

// delete specific event
Router.delete("/:id", async(req,res)=>{
    const {id}= req.params
    try{
        
        const specificEvent = await eventModel.findByIdAndDelete({_id:id})
       
        res.status(204).json({
            status:null
      
      })
    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }
})

// update the event

Router.put("/:id", async(req,res)=>{
    const {id}= req.params
    const{ title, description, location, startTime, endTime} = req.body
    try{
        if(!title || !description || !location || !startTime || !endTime){
            return res.status(400).json({
                error:"Validation Error"
            })
        }
        const updatedEvent = await eventModel.findByIdAndUpdate({_id:id},req.body,{new:true})
        res.status(200).json(updatedEvent)
    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }
})




module.exports = Router