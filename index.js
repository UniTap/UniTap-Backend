require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()


const socketIO = require("socket.io")
const http = require("http")
const bodyParser = require("body-parser")

const authRoutes = require("./routes/auth")
const orderRoutes = require("./routes/order")
const chatroutes = require("./routes/chat_router")

const { chatAppHandler } = require("./socket_io/chatapp_handler")
const path = require('path')
const server = http.Server(app)
const chatIO = socketIO(server, {
    origins: '*:*',
    path: '/chatapp-socket.io'
}, ['polling', 'websocket']) // I don't understand this part :(

app.use(bodyParser.json())
app.use(express.json());

const port = process.env.PORT || 8000;



app.get("/", (req, res) => {

    res.status(200).send("Server is up and running!!");
});



app.use(cors())
app.use("/auth", authRoutes);
app.use('/user', orderRoutes);
app.use("/chatapp", chatroutes);





app.listen(port, () => {
    console.log("Server is Running on port " + port);
});


chatAppHandler(chatIO)