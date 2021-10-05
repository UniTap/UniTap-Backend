const express = require('express')
const { verifyToken } = require('../middleware/authVerify')
const {createOrder} = require('../controller/order')

const router = express.Router();

router.post('/create/order', verifyToken, createOrder)


module.exports = router
