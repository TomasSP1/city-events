const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// @description- ka atlieka: ==> Register new user
// @route- kaip patikrinama: ==> POST /api/users
// @access- ar private, ar public: ==> PUBLIC  --- ar gali prisijungti bet kas ar tik tam tikri useriai (e.g. admin)

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // Hash password- kiek simboliu papildomai prideti uzsifruojant
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "simple",
  });
  if (user) {
    res.status(201).json({
      // jau yra is DB esancia info ir grazina responsa su jau DB esanciais duomenimis
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @description Login a user
// @route POST /api/users/login  - paimam duomenis is userio ir siunciam i DB pasitikrint ar toks useris yra
// @access PUBLIC  - visi gali bandyt prisilogint, bet ne visi prisijungs, jei nera uzsiregistrave
const loginUser = asyncHandler(async (req, res) => {
  // tai ka suveda useris login formoj
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // user.password - is DB uzkoduotas password, lygina login'e ivesta passw su DB esanciu uzkoduotu passw
  if (user && (await bcrypt.compare(password, user.password))) {
    // siunciamas responsas json formatu, sugeneruojamas token logino metu ir irasomas i userio narsykle LS
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      // svarbiausia, kad griztu token, kuris gimsta backende
      token: generateToken(user._id),
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @description Get user data
// @route GET /api/users/user
// @access PRIVATE
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @description Get users data
// @route GET /api/users/list
// @access PRIVATE
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.aggregate([
    {
      $lookup: {
        from: "events",
        localField: "_id",
        foreignField: "user",
        as: "events",
      },
    },
    {
      // kokia role atitikti turi. jei nera sito $match, tai rodo visus userius su ju skelbimais, iskaitant ir admin
      // $match: { role: "simple" },  // tiktai admin'ui rodo tik simple role userius
      $match: { role: { $in: ["simple", "admin"] } }, // rodys visus userius ir simple ir admin
    },
    {
      // cia bus isvardinami dalykai, kuriu nereikia, kad rodytu kai pagetina userius
      $unset: [
        "password",
        "createdAt",
        "updatedAt",
        "events.createdAt",
        "events.updatedAt",
        "events.__v",
        "__v",
      ],
    },
  ]);

  res.status(200).json(users);
});

// Generate JWT: imamas userio ID ir prie jo pridedama uzkodavimo druskyte (papildomas dalykas, kad butu neimanoma atkoduoti) is .env failo
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUsers,
};
