import express from "express";
import bcrypt from 'bcryptjs'
import User from "../models/user.model.js";
import generateCookieAndSetToken from "../utils/generateToken.js";

const router = express.Router();

router.post('/login', async (req, res) => {
   try {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if(!user || !isPasswordCorrect){
      return res.status(400).json({error: "Invalid username or password"})
    }

    generateCookieAndSetToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    })
    
   } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({error: "Internal server error"});
   }
})

router.post('/logout', (req, res) => {
    try {
      res.cookie("jwt", "", {maxAge: 0});
      res.status(200).json({message: "Logged out succesfully!"})
      
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({error: "Internal server error"});
    }
})

router.post('/signup', async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body
        if(password !== confirmPassword) return res.status(400).json({error: "passwords dont match at server"})

        const user = await User.findOne({username})
        if(user) return res.status(400).json({error: "username already exists"})

        const hashedPassword = await bcrypt.hash(password, 10)

        const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`; 

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyPic : girlPic
        })

      if(newUser){
        //generate JWT token
        generateCookieAndSetToken(newUser._id, res);
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName : newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        })
      }else{
        console.log("invalid user data")
      }

    } catch (error) {
        res.status(500).json({error: "internal server error"});
        console.log(error.message);
    }
})


export default router