const { encryptPassword, matchPassword } = require("../helper/userHelper.js");
const userSchema = require("../model/user.js");
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userExists = await userSchema.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .send({ success: false, message: "User Already Exists" });
    }

    const hashedPassword = await encryptPassword(password);

    const newUser = await userSchema.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log(name, email, password);
    return res
      .status(201)
      .json({ success: true, message: "User created successfully", newUser });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Error: ${err.message}` });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const userExists = await userSchema.findOne({ email });
    if (!userExists) {
      return res.status(401).send({
        success: false,
        message: "User with this email does not Exists",
      });
    }
    const passwordMatch = await matchPassword(password, userExists.password);
    if (!passwordMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Email or password",
      });
    }

    const token = await jwt.sign(
      { id: userExists._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXP }
    );
    userExists.password = undefined;
    return res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(201)
      .json({
        success: true,
        message: "User login successfully",
        userExists,
        token,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};

module.exports = { registerController, loginController };
