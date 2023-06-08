import mongoose from "mongoose";

export const connectDB = ()=>{

    mongoose.connect(process.env.MONGO_URI, {
    dbName: "nodeApi",
})
.then(()=> console.log("database connect"))
.catch((e) => console.log(e))
};



// ENV

// this file is for 
// supose you depoly your site and you have to change db
//  1 step that you change your code and again deploy 
//  2 with the help of env you don't need to deploy again you directly cahnge server
//              step
//   create env file put variable
//   go to databse change url into process.env.varible name
//   then connect in app.js by importing