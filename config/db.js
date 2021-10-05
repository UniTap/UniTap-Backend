const mongoose = require('mongoose')

//db connection

// exports.mongo = async () => {
//   await mongoose
//     .connect(process.env.DATABASE_URI, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//     })
//     .then(() => console.log('DB Connected'))

//   mongoose.connection.on('error', (err) => {
//     console.log(`DB connection error: ${err.message}`)
//   })
// }

// ---------------------------------------------------------------------------------------------------------------




// exports.mongo = async () => {
//   await mongoose
//     .connect(process.env.DATABASE_URI)
//     .then(() => console.log('DB Connected'))

//   mongoose.connection.on('error', (err) => {
//     console.log(`DB connection error: ${err.message}`)
//   })
// }


// -------------------------------------------------------------------------------------------------------------------

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Mongodb connected")
        
    }
).catch((err) => { console.log(err); })


// ------------------------------------------------------------------------------------------------------------------














// var User = mongoose.model("User", UserSchema);
var Schema = mongoose.Schema;

var UserSchema = new Schema({
 
  name: {
    type: String,
        required: true
        
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
    password: {
        type: String,
        required: true
  },
  admin: {
      type: Boolean,
    }
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the Article model
module.exports = User;