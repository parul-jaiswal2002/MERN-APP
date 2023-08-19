const User = require('../models/userModel')
const jwt = require('jsonwebtoken')



const createToken = (_id) => {    //ye jo id h ye islei send kr rhe h kyuki yhi payload h
   return jwt.sign({_id } , process.env.SECRET, {expiresIn : '3d'}) //3 args first one is payload, secret key, onption
}


const loginUser = async (req,res) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email,password)
 
        //agr ye user signup kr jata h to hme ek tokenn send krna pdega taki agli bar token match ho jaye
        const token = createToken(user._id)
        res.status(200).json({email, token}) //email islie bhej rhe h taki dobara agr same email se signup kre to error aa jaye
     }
     catch(error){
        res.status(400).json({error  : error.message})
     }
    
}

//for sign up
const signUpUser = async (req, res) => {
    const {email, password } = req.body;
    //ab signup fn call krnge signup krne k lie
    try {
       const user = await User.signup(email,password)

       //agr ye user signup kr jata h to hme ek tokenn send krna pdega taki agli bar token match ho jaye
       const token = createToken(user._id)
       res.status(200).json({email, token}) //email islie bhej rhe h taki dobara agr same email se signup kre to error aa jaye
    }
    catch(error){
       res.status(400).json({error  : error.message})
    }
}

module.exports = {
    loginUser,
    signUpUser
}

//signup fn to bna liya pr ab wo jwt token jo server client ko deta h signup k bad wo npm install jsonwebtoken krna pdta h