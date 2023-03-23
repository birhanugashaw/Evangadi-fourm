const router = require("express").Router();

const auth = require("../../middleware/auth");

const { createUser, getUsers, getUserById, login } = require("./user.controller");

router.post("/", createUser);

router.get("/all", getUsers);

router.get("/", auth, getUserById);

router.post("/login", login);




// router.post("/api", (req, res) => {
//     res.send("succuss")
// });

module.exports = router;
