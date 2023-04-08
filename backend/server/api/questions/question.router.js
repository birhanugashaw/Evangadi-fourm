const router = require("express").Router();
const {
  getQuestionById,
  getQuestions,
  createQuestion,
  addLikeToQuestion,
  addDislikeToQuestion,
} = require("./question.controller");

router.post("/", createQuestion);
router.get("/:id", getQuestionById);
router.get("/", getQuestions);
router.post("/:id/like", addLikeToQuestion);
router.post("/:id/dislike", addDislikeToQuestion);

module.exports = router;
