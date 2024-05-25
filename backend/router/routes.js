const express = require('express')
const { registerUser, loginUser, getUsers, getUser, updateUser, deleteUser } = require('../controller/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router()

router.post('/signup',registerUser)
router.post('/login',loginUser);

router.get('/mee',authMiddleware,(req,res)=>{
    const user = req.user
    res.json({user,status:200})
})
router.get('/',authMiddleware,getUsers)
router.get('/:id',authMiddleware,getUser);
router.put('/edit/:id',authMiddleware,updateUser)
router.delete('/:id',authMiddleware,deleteUser)

module.exports = router;