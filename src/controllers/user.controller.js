import console from "console";
import User from "../models/user.model.js"
import bcrypt from "bcrypt";
import authConfigs from "../configs/auth.config.js";
const register = async (req, res) => {
    console.log(req);
try {
    const { email, password } = req.body;
     
    const user = await User.create({ email, password });
    res.status(201).json({
        success: true,
        message: "user created successfully",
        data: user,
    })
} catch (error) { res.status(500).json({
        success: false,
        message: `something went wrong: {error.message}`,
     })}
};
const login = async (req, res) => {
try {
        //get email and password fromm request body
    const {email,password} = req.body;
    //find if the user exist in the database using email
    const user = await User .findone ({email});
    // user is not in database -> throw error
    if (!user) {
        return res.status(404).json({ success: false, message: "Failed to login"});
    }
//user in  database -> match the password.
const isMatched = await bcrypt.compare(password, user,password)
// password do not match -> throw error.
if(!isMatched) {
    return res.status(404).JSON({ success: false, message: "Failed to login"});
} else {
// password match -> token generate (jwt).

const token = authConfigs.encodeToken(user?.email, user?._id?.toString());
}
// store token in the  cookies.
res.cookie("user-token", token);
// return response to the frontend.
res.status(200).json({
    success: true,
    message: "Successfuly logged in",
    user: {
        id: user?.id,
        email: user?.email
    },
    token: token,
});
} catch (error) {
    res.status(500).json({
        success: false,
        message: "something went wrong",
        error: error.toString(),
    })
}
}
const userControllers = {
    register,
    login,
};
export default userControllers;