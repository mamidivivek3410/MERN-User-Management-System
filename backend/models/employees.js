const { Schema, default: mongoose } = require("mongoose");

const employeesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
})

const Employee = mongoose.model('Employee',employeesSchema)
module.exports = Employee;