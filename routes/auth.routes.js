const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("name", "Name must contain more than 2 chars").isLength({ min: 2 }),
    check("email", "Incorrect email").isEmail(),
    check("login").isLength({ min: 6 }),
    check("password", "Minimal passsword length 6 chars").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: errors.array(), message: "Incorrect data during registration" });
      }

      const { name, email, login, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "This user already exists", error: "error" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        name,
        email,
        login,
        password: hashedPassword,
        friendList: [],
        incomingFriendRequestsList: [],
        outgoingFriendRequestsList: [],
      });

      await user.save();

      res.status(201).json({ message: "User created" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, try it again" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Please, enter a valid email").normalizeEmail().isEmail(),
    check("password", "Please, enter a password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: errors.array(), message: "Incorrect login details" });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found", error: "error" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password, try again", error: "error" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), { expiresIn: "1h" });

      res.json({ token, userId: user.id, userName: user.name });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, try it again" });
    }
  }
);

module.exports = router;
