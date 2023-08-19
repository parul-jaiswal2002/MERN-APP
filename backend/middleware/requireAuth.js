const jwt = require('jsonwebtoken')
const User = require("../models/userModel")

const requireAuth =  async (req, res, next) => {


    const {authorization} = req.headers //(headers ki property h authorization)
    
    if(!authorization){
        return res.status(401).json({error : "Autherization token required"})
    }

    //yha authrizationn kuch esa string hoga = "Bareer dfkajskdfhkdsdl.djfsdkjfieutirjdfla.dfjeirjeidjf"
    //yani 3 part hme to bs barreer k bad ka chahiye

    const token = authorization.split(" ")[1] //array bnakr alg kr liya ab token ko varify krenge

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)//ye varify krke token(id + secret+password) return krta h 
   
        req.user = await User.findOne({_id}).select('_id')//bina select k ye email token id sahit return krta lkin hme to id chahiye bs taki dusre req uski help se ho jaye
        next()//yani controller k next function like getallworkout and all

        //yani ab id req k user propety m store ho gyi h yha req.user hi le jruri nhi req.abc bhi
    }
    catch(error){
        console.log(error)
        res.status(401).json({error : " Request is not authorized"})
    }

}

module.exports = requireAuth //ise hm workout routes m use krnege taki ye phle ho baki bad m raoutes