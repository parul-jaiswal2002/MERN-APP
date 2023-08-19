const mongoose = require("mongoose")
//it allowes to use schema, alone mongodb it is schema-less

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title : {
        type : String, //title ka typw string h agr nya workout bnaye database m to title string hi rhna chahiye else won't allow
        required : true
    },
    reps : {    //repeatition
       type: Number,
       required : true
    },
    load : {    //repeatition
        type: Number,
        required : true
     },
     user_id : {
        type : String,
        required : true
     }//ye uske lie taki hr user ko sirf usi k workouts dikhe
}, {timestamps: true})
 // schema has 2 paramiters and it defines a  structure of a perticular document or type of doc inside our database
 //agr koi dusra workout doc bnaye or schema ki ek bhi property missing h to it won't allow
// ab hm model bnayenge
// a model does apply that schema to a perticular model and then we use the model to interact with a collection of that name
//model takes 2 params one is document second one is schema
module.exports = mongoose.model('Workout' , workoutSchema)