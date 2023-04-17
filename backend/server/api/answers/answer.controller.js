const { answerQuestion, answerByQuestionId } = require("./answer.service");

module.exports = {
  solveQuestion: (req, res) => {
    const { answer, id, questionId } = req.body;

    //validation
    if (!answer || !id || !questionId) {
      return res
        .status(400)
        .json({ msg: "please fill the the answer field!" });
    }

    //sending data to answer table
    answerQuestion(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection" });
      }
      return res.status(200).json({
        msg: "Answer was successfully inserted",
        data: results,
      });
    });
  },
  getAnswerByQuestionId: (req, res) => {
    let qId = req.params.id;
    answerByQuestionId(qId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection" });
      }
      // if (!results) {
      //     return res.status(400).json({ msg: "Record not found" });
      // }
      return res.status(200).json({ data: results });
    });
  },
};
