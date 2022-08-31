
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const generateToken = require("../utils/generateToken")

const authUser = asyncHandler(async(req,res) =>{


    const {email,password} = req.body
    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))){
        res.json({

            _id: user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),

        })
    }
    else{
        res.status(401)
        throw new Error("invalid email or password")
    }

})
const getUserProfile = asyncHandler(async(req,res)=>{
   
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })

    }else{
        res.status(401)
        console.log("found")
        throw new Error("User not found in Db")
    }
})

const updateUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id)
    
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      console.log("user not found cant update")
      throw new Error('User not found')
    }
  })

const registerUser  = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400)
        throw new Error("User already exits")

    }
    const user = await User.create({
        name,
        email,
        password
    })
    if (user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})

const getUsers = asyncHandler(async(req,res)=>{
   
    const users = await User.find({})
    res.json(users)

   
})





module.exports = {authUser,getUserProfile, registerUser,updateUserProfile,getUsers}
