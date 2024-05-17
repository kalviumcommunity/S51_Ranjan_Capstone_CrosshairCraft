const express = require('express')
const User = require('../models/user.model')
const crosshair = require('../models/Crosshair.model')
const feedback = require('../models/Feedback.model')
const bcrypt = require('bcrypt')
const nodemailer    = require('nodemailer')
require('dotenv').config()

const signUpRouter = express.Router()
const LoginRouter = express.Router()
const crosshairRouter = express.Router()
const updatecrosshair = express.Router()
const deletecrosshair = express.Router()
const googleRouter = express.Router()
const presetRouter = express.Router()
const feedbackRouter = express.Router()


signUpRouter.post("/signuppage",async (req, res) =>{
    try{
        const {name, username, email, password} = req.body
        if(!name || !username || !email || !password){
            return res.status(400).json({Message: "Please enter all fields"})
        }
        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({Message: "User already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        let newUser = await User.create({name, username, email, password: hashedPassword})
        await sendVerificationEmail(newUser.email,newUser.verified)

        return res.status(200).json({User: newUser})
    } catch(err){
        return res.status(500).json({success: false, message: err.message,});
    }
})


async function sendVerificationEmail(email, verified) {
    try {
        // Create transporter using nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

     
        const url = "http://localhost:5173/verification"

        const mailOptions = {
            from: "ranjan.m1325@gmail.com",
            to: email,
            subject: "Account Verification",
            html: `
        <p>Please click the following button to verify your email address:</p>
        <a href="${url}"  target="_parent" style="background-color: #4CAF50; color: white; padding: 15px 25px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 10px;">Verify Email</a>
    `,
        };

        // Send email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending verification email:", error);
        // Handle error appropriately
    }
}

presetRouter.get("/verification", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ verified: false }, { verified: true }, { new: true });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


LoginRouter.post('/loginpage',async (req, res) => {
    try{
        const {username, password} = req.body
        if(!username || !password){
            return res.status(400).json({Message: "Please enter all fields"})
        }
        let user = await User.findOne({username})
        if(!user){
            return res.status(400).json({Message: "User not found"})
        }
        const passwordCheck = await bcrypt.compare(password, user.password)
        if(!passwordCheck){
            res.status(400).json({Message: "Invalid Username or password"})
        }
        return res.status(200).json({
            message: `Welcome back, ${user.username}`,
            user,
        });
    } catch(err){
        return res.status(500).json({success: false, message: err.message,});
    }
    
})

crosshairRouter.post("/add",   async (req, res) => {
    try {
        const { CrosshairID, Type, Color,Game, CreatedBy } = req.body;

        // ValiType request body
        if (!CrosshairID || !Type || !Color ||  !CreatedBy) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        
        // Create new crosshair with user ID
        const newcrosshair = await crosshair.create({
            CrosshairID,
            Type,
            Color,
            Game,
            CreatedBy,

        });

        return res.status(200).json({ message: "crosshair added successfully", crosshair: newcrosshair });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

// Updating crosshairs
updatecrosshair.patch("/patch/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updated = req.body
        const updatedcrosshair = await crosshair.findOneAndUpdate({ CrosshairID: id }, updated, { new: true });
        if (!updatedcrosshair) {
            return res.status(404).json({ error: 'crosshair not found' });
        }
        res.status(200).json(updatedcrosshair);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

// Deleting a Crosshair
deletecrosshair.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletecrosshair = await crosshair.findOneAndDelete({ CrosshairID: id })
        if (!deletecrosshair) {
            return res.status(404).json({ error: 'Crosshair not found' });
        }
        res.status(200).json(deletecrosshair);
    } catch(err){
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }


})



// Googlelogin
googleRouter.post("/googlelogin",async (req, res) =>{
    try{
        const {name, username, email} = req.body
        if(!name ||  !email ){
            return res.status(400).json({Message: "Please enter all fields"})
        }
        let user = await User.findOne({email})

        // const salt = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(password, salt)

        let newUser = await User.create({name, username, email})
        return res.status(200).json({User: newUser})
    } catch(err){
        return res.status(500).json({success: false, message: err.message,});
    }
})

presetRouter.get('/preset',async (req, res)=>{
    try{
        const preset  =  await crosshair.find()
        res.status(200).send(preset)
        

    }catch(e){
        res.status(400).send("Error")
        
    }
})

feedbackRouter.get('/feedback',async (req, res)=>{
    try{
        const preset  =  await feedback.find()
        res.status(200).send(preset)
        

    }catch(e){
        res.status(400).send("Error")
        
    }
})

feedbackRouter.post("/feedbackpost",async (req, res) =>{
    try{
        const {feedback,name} = req.body
        if(!feedback ||  !name ){
            return res.status(400).json({Message: "Please enter all fields"})
        }
        

        let newFeedback = await feedback.create({feedback,name})
        return res.status(200).json({feedback: newFeedback})
    } catch(err){
        return res.status(500).json({success: false, message: err.message,});
    }
})







module.exports = {signUpRouter, LoginRouter,crosshairRouter,updatecrosshair,deletecrosshair,googleRouter,presetRouter,feedbackRouter}