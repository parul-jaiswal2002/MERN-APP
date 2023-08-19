const express = require("express")
const {getAllWorkout,getSingleWorkout,createWorkout,deleteWorkout,updateWorkout} = require("../controllers/workoutControllers")


//middleware// require auth for all workout routes
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)
//ye router phle requireauth ko fire krega// taki koi bhi crud operation bina authentication k na dekh ske
//agr error hoga to iske catch function se whi se return ho jayega

//Get all workouts
router.get("/", getAllWorkout)

 //get a single workout
 router.get("/:id", getSingleWorkout)
 
//post a new workout
router.post("/", createWorkout)

//DELETE a workout
router.delete("/:id", deleteWorkout)

//UPDATE a workout
router.patch("/:id" , updateWorkout)

module.exports = router