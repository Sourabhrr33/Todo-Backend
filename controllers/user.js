import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandle from "../middleware/error.js";



export const login = async (req, res) => {
  try {
   const task= await Task.findById(req.params.id)

    if(!task) return next(new ErrorHandle("Task not found", 404));
    await task.deleteOne();


res.status(200).json({
success:true,
message: "Task Deleted"

})
  } catch (error) {
   next(error)
  }

}
export const register = async (req, res) => {
  try {
   const { name, email, password } = req.body;
   let user = await User.findOne({ email });

   // if (user)
   //    return res.status(404).json({
   //       success: false,
   //       message: "user Already Exist"
   //    })

   if (user) return next(new ErrorHandle("user Already Exist", 404));


   const hashedpassword = await bcrypt.hash(password, 10)
   user = await User.create({ name, email, password: hashedpassword })

   sendCookie(user, res, "resgister Successfully, 201")
  } catch (error) {
   next(error)
  }

};

export const getMyProfile = (req, res) => {


   return res.status(200).json({
      success: true,
      user: req.user,
   })

};

export const logout = (req, res) => {

   res.status(200).cookie("token", "",
    { expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV ==="DEVELOPMENT" ? "lax": "none",
      secure:process.env.NODE_ENV ==="DEVELOPMENT" ? "false": "true",
   
   })
    
    .json
      ({
         success: true,
         user: req.user,
      })

};



