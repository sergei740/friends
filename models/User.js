const { Schema, model } = require("mongoose");
const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // photo: { data: Buffer, contentType: String },
  friendList: { type: Array },
  incomingFriendRequestsList: { type: Array },
  outgoingFriendRequestsList: { type: Array },
});

module.exports = model("User", schema);
