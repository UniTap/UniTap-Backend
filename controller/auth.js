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
 



// Create route pending
exports.createUser = (req, res) => {
  // const { name, email, password } = req.body;
  // const userobj = {
  //   name,
  //   email, password 
  // }
  
  
  // User.create(userobj)
  // // User.insertOne(userobj)
  //   .then((data) => {
  //     console.log(data);
  //     if (data.success) {
  //       res.send().json({
  //         message:"User Added successfully",
  //       })
  //     }
  // })



  //////////---------------------------------------------------

  const { name, email, password } = req.body;
  console.log(name, " ", email, " ", password);

  User.find({ email: `${email}` }).then((data) => {
      if (data.length > 0) {
          res.status(400).json({
              error: "user Already exists",
            });
      }
      else {
          // var user = { name: `${username}`, email: `${email}`, password: `${password}` };
          // User.create(user)
          // .then(function(dbuser) {
          //     console.log(dbuser);
          // })
          // .catch(function(err) {
          //     console.log(err);
          // });

          bcrypt.hash(password, 12, (err, hash) => {
              
              if (err) {
                  res.status(500).json({
                      error: "Internal server error"
                  })
              }
              const userinfo = {
                  name,
                  email,
                  password: hash,
              };
              var user = { name: `${userinfo.name}`, email: `${userinfo.email}`, password: `${userinfo.password}` };
              User.create(user)
                  .then((data) => {
                      console.log(data);
                      var token = jwt.sign({
                          name: name,
                          email: email,
                          //can be used if we want to send token to frontend
                      },
                          process.env.SECRET_KEY
                      );
                      res.status(200).json({
                          message: "User added successfully",
                      })
                  })
                  .catch((err) => {
                      console.log(err);
                      res.status(500).json({                                    
                          error: "Database Error! "
                      })
                  })

              // tempdata.push(user);
              // console.log(tempdata);
              // res.status(200).send(hash);
              // Store hash in your password DB.
          });
          
      }
      
  })

//    


}

// Create route pending
exports.createAdmin = (req, res) => {
  // const { name, email, password } = req.body;
  // const userobj = {
  //   name,
  //   email, password 
  // }
  
  
  // User.create(userobj)
  // // User.insertOne(userobj)
  //   .then((data) => {
  //     console.log(data);
  //     if (data.success) {
  //       res.send().json({
  //         message:"User Added successfully",
  //       })
  //     }
  // })



  //////////---------------------------------------------------

  const { name, email, password } = req.body;
  console.log(name, " ", email, " ", password);

  User.find({ email: `${email}` }).then((data) => {
      if (data.length > 0) {
          res.status(400).json({
              error: "user Already exists",
            });
      }
      else {
          // var user = { name: `${username}`, email: `${email}`, password: `${password}` };
          // User.create(user)
          // .then(function(dbuser) {
          //     console.log(dbuser);
          // })
          // .catch(function(err) {
          //     console.log(err);
          // });

          bcrypt.hash(password, 12, (err, hash) => {
              
              if (err) {
                  res.status(500).json({
                      error: "Internal server error"
                  })
              }
              const userinfo = {
                  name,
                  email,
                  password: hash,
              };
              var user = { name: `${userinfo.name}`, email: `${userinfo.email}`, password: `${userinfo.password}`, admin: true};
              User.create(user)
                  .then((data) => {
                      console.log(data);
                      var token = jwt.sign({
                          name: name,
                          email: email,
                          //can be used if we want to send token to frontend
                      },
                          process.env.SECRET_KEY
                      );
                      res.status(200).json({
                          message: "User added successfully",
                      })
                  })
                  .catch((err) => {
                      console.log(err);
                      res.status(500).json({                                    
                          error: "Database Error! "
                      })
                  })

              // tempdata.push(user);
              // console.log(tempdata);
              // res.status(200).send(hash);
              // Store hash in your password DB.
          });
          
      }
      
  })

//    


}

exports.updateUser = (req, res) => {
  const {name, email } = req.body;
  User.updateOne({ email: `${email}` }, { $set: { "name": `${name}` } })
    .then((data) => {
      console.log(data);
      if (data.acknowledged == true) {
        res.status(200).json({
          message:"User Updated",
        })
      }
      else {
        res.status(400).json({
          message:"User update failed",
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message:"Internal server error",
      })
    })
}

exports.deleteUser = (req, res) => {
  const email = req.body.email;
  User.deleteOne({ email: `${email}` })
    .then((data) => {
      // console.log(data.deletedCount);
      if (data.deletedCount ==1 ) {
        res.status(200).json({
          message:"User deleted",
        })
      }
      else {
        res.status(400).json({
          message:"User not deleted",
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
      message:"Internal server Error",
    })
  })
}