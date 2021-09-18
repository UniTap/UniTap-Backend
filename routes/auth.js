const express = require('express');
const { createUser , signIn , updateUser ,deleteUser , createAdmin} = require('../controller/auth');
const { adminVerify } = require('../middleware/adminVerify');
const { verifyToken } = require('../middleware/authVerify');





const router = express.Router();

router.post("/signin",signIn);
// router.post("/create", adminVerify, createUser);
router.post("/createuser" ,verifyToken, adminVerify, createUser);
router.post("/updateuser" ,verifyToken, adminVerify, updateUser);
router.post("/deleteuser" ,verifyToken, adminVerify, deleteUser);


router.post("/createadmin",verifyToken, adminVerify, createAdmin);
router.post("/updateadmin",verifyToken, adminVerify,updateUser);
router.post("/deleteadmin" ,verifyToken, adminVerify, deleteUser);


module.exports = router;