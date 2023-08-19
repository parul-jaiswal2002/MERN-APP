const Workout = require("../models/workoutModel")
const mongoose =  require("mongoose")

//get all workout
const getAllWorkout = async (req, res) => {
    const user_id = req.user._id //ab ye sirf usi user k workout serch krega
     const workouts = await Workout.find({user_id}).sort({createdAt : -1})
    res.status(200).json(workouts)
}

//get a single workout with id
const getSingleWorkout  = async (req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){ //kyuki hr ki no. mongoos type ka nhi hota
        return res.status(404).json({
            error : "No such Id"
        })
    }

    const workout = await Workout.findById(id)
    console.log(workout)
    if(!workout){
        return res.status(404).json({error : "No Such Workout"})
    }
    res.status(200).json(workout)
}
//create a workout
const createWorkout = async (req,res) => {
    const {title, load, reps} = req.body
    let emptyfields = []
    if(!title){
        emptyfields.push("title")
    }
    if(!load){
        emptyfields.push('load')
    }
    if(!reps){
        emptyfields.push('reps')
    }
    if(emptyfields.length > 0){
        return res.status(400).json({error : "please fill all the fields", emptyfields})
    }
    try{
        const user_id = req.user._id //requireauth se
        // yha hm workout nam ka document bna rhe h
       const workout = await Workout.create({title, load, reps, user_id}) //to make it synchronus
       res.status(200).json(workout) //us document ko hm resposne krenge taki user ko lge uska data create ho gya h
    }
    catch(error){
       res.status(400).json({error : error.message})
    }
}

//delete a workout
const deleteWorkout = async (req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error : "No Such Id"
        })
    }
    const workout  = await Workout.findByIdAndDelete({_id : id})
    if(!workout){
        return res.status(404).json({
            error : "No such workout"
        })
    }
    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No Such Id"})
    }
    const workout = await Workout.findOneAndUpdate({_id : id}, {
        ...req.body
    })
    if(!workout){
        return res.status(404).json({error : "No such workout"})
    }
    res.status(200).json(workout)
}

module.exports = {
    getAllWorkout,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}