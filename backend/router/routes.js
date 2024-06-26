const express = require('express')
const { registerUser, loginUser, getUsers, getUser, updateUser, deleteUser } = require('../controller/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const { addEmployee, getSecondEmployee, getAllEmployees } = require('../controller/employee-controller');
const router = express.Router()

router.post('/signup',registerUser)
router.post('/login',loginUser);

router.get('/mee',authMiddleware,(req,res)=>{
    const user = req.user
    res.json({user,status:200})
})
router.get('/',getUsers)
router.get('/:id',getUser);
router.put('/edit/:id',updateUser)
router.delete('/:id',deleteUser)



// employee
router.post('/addEmployee',addEmployee)
router.get('/getAllEmployees',getAllEmployees)
router.get('/getSecondEmployee',getSecondEmployee)
module.exports = router;