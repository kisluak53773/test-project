const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const errorHandler = require("../error/errorHandler");
const jwt = require("jsonwebtoken");

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

async function registration(req, res, next) {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return next(errorHandler.badRequest("Email or password are absent"));
  }
  const possibleUser = await User.findOne({ where: { email } });
  if (possibleUser) {
    return next(errorHandler.badRequest("Such user already exists"));
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({
    email,
    role,
    password: hashPassword,
  });
  const token = generateToken(user.id, user.email, user.role);
  return res.json({ token });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(errorHandler.badRequest("Wrong password or email"));
  }
  const token = generateToken(user.id, user.email, user.role);
  return res.json({ token });
}

async function auth(req, res) {
  const { id, email, role } = req.user;
  const token = generateToken(id, email, role);
  return res.json({ token });
}

module.exports = {
  registration,
  login,
  auth,
};
