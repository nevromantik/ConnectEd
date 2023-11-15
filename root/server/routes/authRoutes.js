
const { register, login, logout } = require("../controllers/authController.js");
const { checkUser } = require("../middlewares/authMiddleware.js");

const router = require("express").Router();

router.post("/", checkUser); 
router.post("/register", register);
router.post("/login", login);
router.post('/logout', logout);


module.exports = router;