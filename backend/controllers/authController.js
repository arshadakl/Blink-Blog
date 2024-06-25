import { createUser, findUserByEmail, findUserByUsername } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import CustomError from '../utils/CustomError.js';


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

const register = async (req, res,next) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    if (!(username && email && password)) {
      throw new CustomError("Please fill all the fields", 422);
    }

    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      throw new CustomError("Email already exists", 400);
    }

    const existingUsername = await findUserByUsername(username);
    if (existingUsername) {
      throw new CustomError("Username already exists", 400);
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ username, email, password: encryptedPassword });
    const token = generateToken(newUser)
    // newUser.password = undefined;
    res.status(201).json({status:true, message: 'User registered successfully', user: newUser,token });
  } catch (error) {
    next(error)
  }
};



const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      throw new CustomError("Please fill all fields", 422);
    }
    const user = await findUserByEmail(email);
    if (!user) {
      throw new CustomError("Invalid username or password", 401);
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError("Invalid username or password", 401);
    }
    const token = generateToken(user);
    user.password = undefined;
    res.status(200).json({ status: true, message: "Login successful", user, token });
  } catch (error) {
    next(error);
  }
};


export { register, login };
