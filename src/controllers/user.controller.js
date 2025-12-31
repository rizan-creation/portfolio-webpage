import User from "../models/user.model.js"
const register = async (req, res) => {
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
const login = async (req, res) => {};
const userControllers = {
    register,
    login,
};
export default userControllers;