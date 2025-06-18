const { encryptPassword } = require("../helper/userHelper.js");
const userSchema = require("../model/user.js");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userExists = await userSchema.findOne({email});
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

module.exports = { registerController };
