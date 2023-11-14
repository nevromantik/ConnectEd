const User = require("../models/User");
const { hash, compare } = require("bcryptjs");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../utils/tokens");
module.exports.signup = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const hashedPassword = await hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role });
    await res.status(201).json({
      message: "User created",
      data: [user],
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: err.message,
    });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User doesn't exist");
    const valid = await compare(password, user.password);
    if (!valid) throw new Error("Password not correct");
    // Se corretta crea il refresh e l'access token
    const accesstoken = createAccessToken(user._id);
    const refreshtoken = createRefreshToken(user._id);
    user.refreshtoken = refreshtoken;
    console.log('***refresh', user)

    sendAccessToken(req, res, accesstoken);
    sendRefreshToken(res, refreshtoken);
  } catch (error) {
    // res.send({
    //   error: error.message
    // })
  }
};

module.exports.logout = async (_req, res) => {
  res.clearCookie("refreshtoken");
  return res.send({
    message: "Logged out",
  });
};

// Riprendi un refresh token quando scade l'access token
// Fallo tramite cookie in quanto è stato inviato così e non tramite response
module.exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshtoken;
  console.log(token, '**')
  if (!token) return res.send({ accesstoken: "" });
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: "" });
  }
  const user = User.find((user) => user._id === payload.userId);
  if (!user) return res.send({ accesstoken: "" });
  // se lo user esiste, controlla se il refresh token esiste nello user
  if (user.refreshtoken !== token) {
    return res.send({ accesstoken: "" });
  }
  // se il token esiste, crea un nuovo refresh and accesstoken
  const accesstoken = createAccessToken(user._id);
  const refreshtoken = createRefreshToken(user._id);
  user.refreshtoken = refreshtoken;
  sendRefreshToken(res, refreshtoken);
  return res.send({accesstoken})
};
