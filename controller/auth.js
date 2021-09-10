const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../config/db');





exports.signIn = (req, res) => {
    const { email, password } = req.body;
console.log(email);
console.log(password);
User.find({ email: `${email}` })
  .then((data) => {
    userData = data.rows;
    console.log(data[0]);
     const username = data[0].name;
     console.log(username);

      if (data.length === 0) {
     
       res.status(400).json({
         error: "User does not exist, signup instead!",
       });
     } else {
       
       bcrypt.compare(password, data[0].password, (err, result) => {
         if (err) {
           
           res.status(500).json({
             error: "Server error!",
           });
         } else if (result === true) {
           
           const token = jwt.sign(
             {
               email: email,
             },
             process.env.SECRET_KEY
           );
           res.status(200).json({
             message: "User signed in successfully",
             token: token,
             username: username,
           });
         } else {
          
           res.status(400).json({
             error: "Enter correct password!",
           });
         }
       });
     }
   })
   .catch((err) => {
     console.error(err);
       res.status(500).json({
           error: "Database error occurred!",
       });
     });
};
 

