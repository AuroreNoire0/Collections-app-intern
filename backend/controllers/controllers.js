const asyncHandler = require("express-async-handler");
const User = require("../userModel");
const Message = require("../messageModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const userExists = await User.findOne({ name });

  if (!userExists) {
    const user = await User.create({
      name,
      messages: [],
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        messages: [],
      });
    } else {
      res.status(404);
      throw new Error("Error occured");
    }
  } else if (userExists) {
    res.json({
      _id: userExists._id,
      name: userExists.name,
      messages: userExists.messages,
    });
  }

  //   res.json({
  //     _id: user._id,
  //     name: user.name,
  //   });

  //   const user = await User.create({
  //     name,
  //     messages,
  //   });
  //   else if (user) {
  //     res.status(201).json({
  //       _id: user._id,
  //       name: user.name,
  //       messages: {},
  //     });
  //   } else {
  //     res.status(404);
  //     throw new Error("Error occured");
  //   }
});

// const authUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       status: user.status,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid email or password");
//   }
// });

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const getMessages = asyncHandler(async (req, res) => {
  const name = req.params.name;
  const user = await User.findOne({ name });
  console.log(user);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      messages: user.messages,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { name, message, sender } = req.body;
  const newMessage = new Message(message);
  const user = await User.findOneAndUpdate(
    { name: name },
    { $push: { messages: newMessage } }
  );
  console.log(name);
  console.log(message);
  console.log(sender);
  console.log(newMessage);

  if (user) {
    console.log(user.messages);
    updatedUser = await user.save();
    console.log(updatedUser);
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (user) {
//     await user.remove();
//     res.json({ message: "User deleted" });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// const blockUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (user) {
//     user.status = "Blocked";
//     updatedUser = await user.save();
//     res.json(updatedUser);
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

module.exports = { getUsers, registerUser, sendMessage, getMessages };
