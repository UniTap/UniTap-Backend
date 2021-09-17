const express = require('express');
const { createUser , signIn , updateUser ,deleteUser} = require('../controller/auth');





const router = express.Router();

router.post("/signin",signIn);
// router.post("/create", adminVerify, createUser);
router.post("/createuser", createUser);
router.post("/updateuser", updateUser);
router.post("/deleteuser", deleteUser);





module.exports = router;