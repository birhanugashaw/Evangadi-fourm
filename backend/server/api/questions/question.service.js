const pool = require("../../config/database").pool;

module.exports = {
  addQuestion: (data, callback) => {
    pool.query(
      `INSERT INTO question(question, question_description, question_code_block, tags, post_id, user_id, likes, dislikes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.question,
        data.questionDescription,
        data.questionCodeBlock,
        data.tags,
        data.postId,
        data.id,
        data.likes || 0,
        data.dislikes || 0,
      ],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  getAllQuestions: (callback) => {
    pool.query(
      `SELECT registration.user_name, question, question_description, question_code_block, tags, post_id, question_id, likes, dislikes FROM question JOIN registration ON question.user_id = registration.user_id ORDER BY question_id DESC`,
      [],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  questionById: (id, callback) => {
    //id is postId
    pool.query(
      `SELECT * FROM question WHERE question_id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result[0]);
      }
    );
  },
  likeQuestion: (id, callback) => {
    pool.query(
      `UPDATE question SET likes = likes + 1 WHERE question_id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  dislikeQuestion: (id, callback) => {
    pool.query(
      `UPDATE question SET dislikes = dislikes + 1 WHERE question_id = ?`,
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
