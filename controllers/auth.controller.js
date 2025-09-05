import { generateToken } from "../lib/utils.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

// function to register a user using (name, email and password)
export const signup = async (req, res) => {
  // take input from frontend or user
  const { name, email, password } = req.body;

  try {
    // check the given input by the user is valid or not
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    // check the length of password it must be greater than 6 digits
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // check the user is already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already exists" });
    }

    // make password encrypted
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user 
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    // if user is create then generate the tokens and save the user
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      // return the user if successfully create
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      }, { message: "Signup successfully"});
    } else {
      // if user not create
      res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    // handle the error if any internal server error
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// fuction for login the user by using email and password
export const login = async (req, res) => {
  // take the email password as input
  const { email, password } = req.body;

  try {
    // find the user using email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not found" });
    }

    // if the password is wrong then return a message
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate the token for user and return the user as response
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    }, { message: "Login successfully"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// fuction for logout the user using tokens
export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// function for check the authentication status 
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
