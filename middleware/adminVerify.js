const User = require('../config/db');

exports.adminVerify2 = (req, res , next) => {
    const email = req.body.email;
    User.find({ email: `${email}` })
        .then((data) => {
            console.log(data);
            if (data[0].admin == true) {
                next()
            }
            else {
                res.status(404).json({
                    error: 'Admin not signed in',
                })
            }
    })
}