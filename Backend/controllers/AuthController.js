 const bcrypt = require("bcrypt");
const UserModel = require("../Models/user");
const jwt=require('jsonwebtoken')
// SIGNUP CONTROLLER
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists. Please login.",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    // Respond with success
    res.status(201).json({
      message: "Signup successful.",
      success: true,
    });
    console.log("Request Body in Validation:", req.body);
  } catch (error) {
    console.error(error);
     

    res.status(500).json({
        
      message: "Internal server error.",
      success: false,

    });
  }
};
const login = async (req, res) => {
  try {
    const {email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(403).json({
        message: "Auth failed email or password is wrong",
        success: false,
      });
    }

  const isPassEqual=await bcrypt.compare(password,existingUser.password)
  if(!isPassEqual){
     return res.status(403).json({
        message: "Auth failed email or password is wrong",
        success: false,
      });
  }
  const jwtToken=jwt.sign(
    {email:existingUser.email,_id:existingUser._id},
    process.env.JWT_SECRET,
    {expiresIn:"24hr"}
  )

    // Respond with success
    res.status(200).json({
      message: "Login successful.",
      success: true,
      jwtToken,
      email,
      name:existingUser.name
    });
    console.log("Request Body in Validation:", req.body);
  } catch (error) {
    console.error(error);
     

    res.status(500).json({
        
      message: "Internal server error.",
      success: false,

    });
  }
};

module.exports = { signup,login };
