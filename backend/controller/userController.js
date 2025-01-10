const httpStatusCode = require("../constants/httpStatusCode");
const { getToken } = require("../middleware/authMiddleware");
const adminModel = require("../models/adminModel");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Email or Pasword is empty",
      });
    }
    const User = await adminModel.findOne({ email });
    if (!User) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "User not found with this email",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, User.password);
    if (!isPasswordCorrect) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const token = await getToken(User);

    console.log(User);
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Login Successfully",
      data: { User, token },
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!!",
      error: error.message,
    });
  }
};
const Register = async (req, res) => {
  try {
    const { email, password, username, role } = req.body;
    if (!email || !password || !username || !role) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "email or password or username is empty",
      });
    }
    let isExistingUser;
    if (role === "user") {
      isExistingUser = await UserModel.findOne({ email });
    } else if (role === "admin") {
      isExistingUser = await adminModel.findOne({ email });
    }
    if (isExistingUser) {
      return res.status(httpStatusCode.CONFLICT).json({
        success: false,
        message: "User already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let User;
    if (role === "consumer") {
      User = await UserModel.create({
        username,
        email,
        password: hashedPassword,
        role,
      });
    }else if (role === "admin") {
      User = await adminModel.create({
        username,
        email,
        password: hashedPassword,
        role,
      });
    }

    if (!User) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to create user",
      });
    }
    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "Registered Successfully",
      data: User,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!!",
      error: error.message,
    });
  }
};

const ViewAllUser = async (req, res) => {
  try {
    const AllUser = await UserModel.find();
    if (!AllUser) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "No user found",
      });
    }

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "User found",
      data: AllUser,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!!",
      error: error.message,
    });
  }
};

module.exports = {
  Login,
  Register,
  ViewAllUser,
};
