const { Router } = require("express");
const User = require("../models/User");
const router = Router();

// /api/users/users
router.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({ users: allUsers });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try it again" });
  }
});

// /api/users/sendFriendRequest
router.post("/sendFriendRequest", async (req, res) => {
  try {
    const { authorizedUserId, friendCandidateId } = req.body;

    const authorizedUser = await User.findById(authorizedUserId);
    const friendCandidate = await User.findById(friendCandidateId);

    if (!authorizedUser.outgoingFriendRequestsList.includes(friendCandidateId)) {
      await authorizedUser.updateOne({
        outgoingFriendRequestsList: [
          ...authorizedUser.outgoingFriendRequestsList,
          friendCandidateId,
        ],
      });
    }

    if (!friendCandidate.incomingFriendRequestsList.includes(authorizedUserId)) {
      await friendCandidate.updateOne({
        incomingFriendRequestsList: [
          ...friendCandidate.incomingFriendRequestsList,
          authorizedUserId,
        ],
      });
    }

    res.status(200).json({ message: "Friend request has been send" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try it again" });
  }
});

// /api/users/cancelSendFriendRequest
router.post("/cancelSendFriendRequest", async (req, res) => {
  try {
    const { authorizedUserId, friendCandidateId } = req.body;

    const authorizedUser = await User.findById(authorizedUserId);
    const friendCandidate = await User.findById(friendCandidateId);

    if (authorizedUser.outgoingFriendRequestsList.includes(friendCandidateId)) {
      await authorizedUser.updateOne({
        outgoingFriendRequestsList: [
          ...authorizedUser.outgoingFriendRequestsList.filter((id) => id !== friendCandidateId),
        ],
      });
    }

    if (friendCandidate.incomingFriendRequestsList.includes(authorizedUserId)) {
      await friendCandidate.updateOne({
        incomingFriendRequestsList: [
          ...friendCandidate.incomingFriendRequestsList.filter((id) => id !== authorizedUserId),
        ],
      });
    }

    res.status(200).json({ message: "Request canceled" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try it again" });
  }
});

// /api/users/acceptFriendRequest
router.post("/acceptFriendRequest", async (req, res) => {
  try {
    const { authorizedUserId, friendCandidateId } = req.body;

    const authorizedUser = await User.findById(authorizedUserId);
    const friendCandidate = await User.findById(friendCandidateId);

    if (authorizedUser.incomingFriendRequestsList.includes(friendCandidateId)) {
      await authorizedUser.updateOne({
        outgoingFriendRequestsList: [
          ...authorizedUser.outgoingFriendRequestsList.filter((id) => id !== friendCandidateId),
        ],
      });

      await authorizedUser.updateOne({
        friendList: [...authorizedUser.friendList, friendCandidateId],
      });
    }

    if (friendCandidate.outgoingFriendRequestsList.includes(authorizedUserId)) {
      await friendCandidate.updateOne({
        incomingFriendRequestsList: [
          ...friendCandidate.incomingFriendRequestsList.filter((id) => id !== authorizedUserId),
        ],
      });
      await friendCandidate.updateOne({
        friendList: [...friendCandidate.friendList, authorizedUserId],
      });
    }

    res.status(200).json({ message: "Now you are friends" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try it again" });
  }
});

// /api/users/deleteFriend
router.post("/deleteFriend", async (req, res) => {
  try {
    const { authorizedUserId, friendId } = req.body;

    const authorizedUser = await User.findById(authorizedUserId);
    const friend = await User.findById(friendId);

    await authorizedUser.updateOne({
      friendList: [...authorizedUser.friendList.filter((id) => id !== friendId)],
    });

    await friend.updateOne({
      friendList: [...friend.friendList.filter((id) => id !== authorizedUserId)],
    });

    res.status(200).json({ message: "Now you are not friends" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try it again" });
  }
});

module.exports = router;
