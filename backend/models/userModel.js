const mongoose = require('mongoose')
const bcrypt = require('bcrypt')//ye extra layer security h agr cyber attack hota h to hashed passward ki wjh se users ko thoda time mil jayega password change krne ka
//isme ek salt method bhi hota h agr 2 user same password h to hashed alg alg honge

const validator = require("validator")


const Schema = mongoose.Schema

//signup means first time register krna
//login meand tumne signup kr liya h ab log in krna h
const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true //agr koi same email id se fr se signup krta h to mongoose same email ko waps save krne ko allow nhi krta h

    },
    password : {
        type : String,
        required : true
    }
})
//ye model hme bhut se method use krne deta h or hm khud bhi ek method jaise signup bna skte h
//statics method (how we gonna create a additional static method)



//kyuki is function m hm this ka use krenge to yha arraow fn use nhi hoga
userSchema.statics.signup = async function (email,password) {
      //validation
      if(!email || !password){
        throw Error('All fields are mandatory')
      }
      if(!validator.isEmail(email)){
        throw Error('Email is not valid')
      }
      if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
      }

    //first we check the email agr ye exist krta h to we dont want to even try and sign them up again
   //hm export bad m kr rhe h to User ki jgh this use krenge
   const exists = await this.findOne({email}) //agr email exist krta h phle se hi to exist ki kush value hogi
   if(exists){
    throw Error("Email already in Use")//hm yha response use nhi kr skte
   }
   //PASSWORD HASHING K LIE bcrypt PACKAGE INSTALL KRANA PDEGA
   //to genrate salt
   const salt = await bcrypt.genSalt(10)//default value = 10
   const hash = await bcrypt.hash(password, salt)
   //

   //password hashing ho gyi ab document jo save hogi db m use bnaye
   const user = await this.create({email, password : hash})

   return user
}

//static login method
userSchema.statics.login = async function (email, password){
  //phle check krenge email or password ki kuch value bhi dali gyi h ya nhi
  if(!email || !password){
    throw Error('All fields are mandatory')
  }
  //ab hm jo email h use database m search krenge
  const user = await this.findOne({email})
  if(!user){
   throw Error("Incorrect Email")
  }
  //ab mana user mil gya
  //ab hm dono password ko compare(built-in) krenge
  const match = await bcrypt.compare(password, user.password)//plain password jo abi abhi user ne dala or user.password hash h jo signup k time dala tha
  //it returns true or false
  if(!match){
    throw Error ("Incorrect Password")
  }

  return user
}


//is function ko hm khi or use krenge
//email or password strong h ya nhi isle validtor use krenge npm install validator

module.exports = mongoose.model("User" , userSchema)


/// pr ab ky kre jb bhi koi signup krega ya login krega dono hi time authentication hoga
//to ab hm JWT ka use krenge
//jwt ek token jo  server deta h perticular user ko taki jb wo login kre tb wo jwt server k jwt se match ho jaye
//jwt header -> algo + payload(data ,(!password bcoz hackers asani se password DECODE kr skte h)) + security code


//   JWT -> 1. Header -> contains algo used for jwt
 //         2.Payload -> contains non-sensitive data(just to find authenticated or not)
 //         3. Signature -> used to varify the token by the server