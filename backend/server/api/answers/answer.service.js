const pool = require("../../config/database").pool;

module.exports = {
  answerQuestion: (data, callback) => {
    pool.query(
      `INSERT INTO answer(answer,question_id,user_id)VALUES(?,?,?)`,
      [data.answer, data.questionId, data.id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  answerByQuestionId: (id, callback) => {
    //id is questionId
    pool.query(
      `SELECT answer_id, answer,  question_id, registration.user_id, registration.user_name FROM answer LEFT JOIN registration ON answer.user_id = registration.user_id WHERE answer.question_id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
};
