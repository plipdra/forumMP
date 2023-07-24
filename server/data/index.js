import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    username: "anemone",
    about: "my enemy",
    email: "anatomy@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "anemone.jpeg",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    username: "bzbee",
    about: "buzz~",
    email: "wasp@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "bzbee.jpeg",
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    username: "ernesto",
    about: "ako to! si ernie",
    email: "dlcrz@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "ernesto.jpeg",
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    username: "fokr",
    about: "missing spoon",
    email: "spon@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "fokr.jpeg",
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[4],
    username: "ricadabest",
    about: "dawan... daonli...",
    email: "ricabac@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "ricadabest.jpeg",
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
  {
    _id: userIds[5],
    username: "tortol",
    about: "I hate straws",
    email: "tortol@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "tortol.jpeg",
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
  },
];

export const posts = [
  {
    _id: "64bdb7a5c965eb6d50cd86ca",
    userId: "64bca19b94953308c00d0501",
    username: "ernesto",
    title: "FIREWORKS!!!",
    description: "They go kaboom!",
    picturePath: "post4.jpeg",
    userPicturePath: "axolotol.png",
    upvotes: new Map([
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
    ]),
    downvotes: new Map([
      [userIds[4], true],
    ]),
    isEdited: false,
    comments: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: "64bdb8833813c74809cb2f6c",
    username: "fafa",
    title: "Egz >>",
    description: "I ordered this super yummy breakfast at ate rica's bacsilog!",
    picturePath: "post2.jpeg",
    userPicturePath: "defaultUser.png",
    upvotes: new Map([
      [userIds[1], true],
      [userIds[2], true],
    ]),
    downvotes: new Map([
      [userIds[3], true],
    ]),
    isEdited: false,
    comments: [ { _id: userIds[0] } ],
  },
];

export const comments = [
  {
    _id: userIds[0],
    commentText: "Boom!",
    postId: "64bdb7a5c965eb6d50cd86ca",
    userId: "64bdb8833813c74809cb2f6c",
    userPicturePath: "defaultUser.png",
    username: "fafa",
    replies: [],
  }
]