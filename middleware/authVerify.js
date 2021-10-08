const jwt = require('jsonwebtoken');
const User = require('../config/db');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            console.log(err);
        }
        // console.log(decoded) // bar
        const userEmail = decoded.email;
        User.find({ email: `${userEmail}` })
            .then((data) => {
                console.log(data);
            if (data.length == 0) {
                res.status(400).json({
                    message: "Invalid token"
                });
            }
            next();
    }) 
      
    .catch((err) => {
    res.status(500).json({
        message: "Databse error"
    });
})
});
};

exports.adminVerify = (req, res , next) => {
    // const email = req.body.email;
    // User.find({ email: `${email}` })
    //     .then((data) => {
    //         console.log(data);
    //         if (data[0].admin == true) {
    //             next()
    //         }
    //         else {
    //             res.status(404).json({
    //                 error: 'Admin not signed in',
    //             })
    //         }
    // })

    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            console.log(err);
        }
        console.log(decoded) // bar
        const userEmail = decoded.email;
        User.find({ email: `${userEmail}` })
            .then((data) => {
                // console.log(data[1].admin);

                if (data[0].admin == true) {
                    next();
           
                }
                else {
                    res.status(400).json({
                        message: "Admin not signed in",
                    });
                }
            
    }) 
      
        .catch((err) => {
        res.status(500).json({
            message: "Databse error"
        });
        });
    })
}