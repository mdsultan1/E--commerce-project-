
const router = require('express').Router()
const {authUser, getUserProfile,registerUser,updateUserProfile,getUsers} = require("../controllers/userController")
const {protect,admin} = require("../middlware/authMiddleware")

router.post("/login", authUser)
router.get("/profile", protect , getUserProfile)
router.post("/profile", protect, updateUserProfile)
router.post("/", registerUser)
router.get("/", protect,admin,getUsers)

module.exports = router