const {
  questionById,
  getAllQuestions,
  addQuestion,
  // likeQuestion,
  // dislikeQuestion,
} = require("./question.service");

module.exports = {
  createQuestion: (req, res) => {
    const { question, id } = req.body;
    req.body.postId = Math.floor(Math.random() * 10000);

    if (!question || !id) {
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });
    }

    addQuestion(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({
        msg: "New question was created successfully",
        data: results,
      });
    });
  },

  getQuestions: (req, res) => {
    getAllQuestions((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection error" });
      }
      return res.status(200).json({ data: results });
    });
  },

  getQuestionById: (req, res) => {
    const id = req.params.id;

    questionById(id, (err, results) => {
      if (err) {
        // console.log(id);
        console.log(err);
        return res.status(500).json({ msg: "database connection error" });
      }
      if (!results) {
        return res.status(400).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });
    });
  },

  addLikeToQuestion: (req, res) => {
    const { questionId } = req.params;

    likeQuestion(questionId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({
        msg: "Question likes updated successfully",
        data: results,
      });
    });
  },

  addDislikeToQuestion: (req, res) => {
    const { questionId } = req.params;

    dislikeQuestion(questionId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({
        msg: "Question dislikes updated successfully",
        data: results,
      });
    });
  },
};
