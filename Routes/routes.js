const express = require('express')
const User = require('../models/user.model')
const crosshair = require('../models/Crosshair.model')
const bcrypt = require('bcrypt')

const signUpRouter = express.Router()
const LoginRouter = express.Router()
const crosshairRouter = express.Router()
const updatecrosshair = express.Router()
const deletecrosshair = express.Router()

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
        return res.status(200).json({User: newUser})
    } catch(err){
        return res.status(500).json({success: false, message: err.message,});
    }
})


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

module.exports = {signUpRouter, LoginRouter,crosshairRouter,updatecrosshair,deletecrosshair}