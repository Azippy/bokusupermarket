const User = require("../Models/Usersmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const { name, email, gender, password, phone } = req.body;
    if (!name || !email || !password || !gender || !phone) {
      return res.status(400).json({ message: "please provide all field" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: `${email} already exist, Please login` });
    }
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(409).json({
        message: `${phone} already exist, Please provide another phone number`,
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashPassword,
      gender,
      phone,
      role,
    });

    await user.save();
    return res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//create login

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "please provide your email and password" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    const data = user.toObject();

    delete data.password;

    res.status(200).json({ message: "login successful", token, data });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
