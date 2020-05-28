const { Router } = require("express");
const User = require("../models/User");
const router = Router();
const auth = require("../middleware/auth.middleware");
const moment = require("moment");

/// api/message/sendMessage
router.post("/sendMessage", auth, async (req, res) => {
  try {
    const senderId = req.user.userId;
    const { friendId, message } = req.body;

    const sender = await User.findById(senderId);
    const friend = await User.findById(friendId);
    const date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss a");

    await sender.updateOne({
      outgoingMessages: [
        ...sender.outgoingMessages,
        {
          id: friendId,
          name: friend.name,
          date: date,
          message: message,
        },
      ],
    });

    await friend.updateOne({
      incomingMessages: [
        ...friend.incomingMessages,
        {
          id: senderId,
          name: sender.name,
          date: date,
          message: message,
        },
      ],
    });

    res.status(200).json({ message: "message sent" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try it again" });
  }
});

/// api/message
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (user.incomingMessages || user.outgoingMessages) {
      res
        .status(200)
        .json({ incomingMessages: user.incomingMessages, outgoingMessages: user.outgoingMessages });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try it again" });
  }
});

module.exports = router;
