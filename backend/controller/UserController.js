const User = require("../models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const registerUser = async (req,res) => {
    const {name,email,password} = req.body;
    try{
        const user = new User({name,email,password})
        await user.save();
        res.json({message:"User registered successfully",status:200})
    }catch(e){
        res.json({message:e.message,status:500})
    }
}

const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
        });
        res.json({token,status:200})
    }catch(e){
        res.json({message:e.message,status:500})
    }
}

const getUsers = async (req,res) => {
    try{
        const users = await User.find().select('-password');
        res.json({users,status:200})
    }catch(e){
        res.json({message:e.message,status:500})
    }
}

const getUser = async (req,res) => {
    try{
        const id = req.params.id;
        const user = await User.findById(id).select('-password');
        res.json({user,status:200})
    }catch(e){
        res.json({message:e.message,status:500})
    }
}
 
const updateUser = async (req,res) => {
    try{
        const id = req.params.id;
        const {name,email,password} = req.body;
        await User.findByIdAndUpdate(id,{name,email,password});
        res.json({message:"User updated successfully",status:200})
    }catch(e){
        res.json({message:e.message,status:500})
    }
}

const deleteUser = async (req,res) => {
    try{
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.json({message:"User deleted successfully",status:200})
    }catch(e){
        res.json({message:e.message,status:500})
    }
}


module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}