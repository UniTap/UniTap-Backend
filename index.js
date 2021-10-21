require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const chatroutes = require("./routes/chat_router");

app.use(express.json());

const port = process.env.PORT || 8000;



app.get("/", (req, res) => {

    res.status(200).send("Server is up and running!!");
});




app.use("/auth", authRoutes);
app.use('/user', orderRoutes);
app.use("/chatapp", chatroutes);





app.listen(port, () => {
    console.log("Server is Running on port " + port);
});
