const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { BadRequestError } = require("../errors");
const { UnauthenticatedError } = require("../errors");
dotenv.config();
const {StatusCodes} = require('http-status-codes'); 

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_LIFETIME = process.env.JWT_LIFETIME;

const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { userId: user._id, name: user.name, email:user.email }, token });
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

 if (await user.comparePassword(req.body.password) === false){
    throw new UnauthenticatedError("Invalid credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { userId: user._id, name: user.name }, token });
};

module.exports = {
  register,
  login,
};
