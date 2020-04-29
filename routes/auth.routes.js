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
    check("name", "Имя должно содержать более 2 букв").isLength({ min: 2 }),
    check("email", "Неккоректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Некореектные данные при регистрации" });
      }

      const { name, email, login, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "This user already exists" });
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
    check("email", "Введите корректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Некореектные данные при входе в систему" });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль, попробуйте снова" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), { expiresIn: "1h" });

      res.json({ token, userId: user.id, userName: user.name });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, try it again" });
    }
  }
);

module.exports = router;
