const { v4: uuidv4 } = require('uuid');
const {
  questionById,
  getAllQuestions,
  addQuestion,
} = require("./question.service");

module.exports = {
  createQuestion: (req, res) => {
    const { question } = req.body;
    req.body.postId = uuidv4();

    if (!question) {
      return res.status(400).json({ msg: "Please fill the title field!" });
    }

    //sending data to question table
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
        console.log(err);
        return res.status(500).json({ msg: "database connection error" });
      }
      if (!results) {
        return res.status(400).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });
    });
  },
};
