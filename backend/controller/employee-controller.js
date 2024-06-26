const Employee = require("../models/employees");

const addEmployee = async (req,res) => {
    try{
        const {name,salary} = req.body;
        if(!name) return res.status(401).json({message:"Name is required"})
        if(!salary) return res.status(401).json({message:"Salary is required"})
        // const existingEmployee = await Employee.findOne({name,salary})
        // if(existingEmployee){
        //     return res.status(401).json({message:"Employee already exists"})
        // }
        const employee = new Employee({name,salary});
        await employee.save();
        res.json({message:"Employee added successfully"})
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const getAllEmployees = async (req,res) => {
    try{
        const employees = await Employee.find();
        if(employees.length === 0) return res.status(401).json({message:"No employee found"})
        return res.status(200).json({employees})
    }catch(e){
        res.status(500).json({message:e.message})
    }
}


const getSecondEmployee = async (req,res) => {
    try{
        // const employee = await Employee.find().sort({salary:-1}).skip(1).limit(1)
        const employee = await Employee.find().sort({salary:-1}).distinct('salary').skip(1).limit(1)
        res.status(200).json({employee})
    }catch(e){
        res.status(500).json({message:e.message})
    }
}
module.exports = {
    addEmployee,
    getSecondEmployee,
    getAllEmployees
}