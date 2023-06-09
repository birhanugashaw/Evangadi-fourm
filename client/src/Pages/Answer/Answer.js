import React, { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { UserContext } from "../../context/Usercontext";
import "./Answer.css";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Answer() {
  const [userData, setUserData] = useContext(UserContext);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const questionAsk = await axios.get(`/api/question/${id}`);
        setQuestion(questionAsk.data?.data);
      } catch (err) {
        console.log("problem", err);
      }
    };
    getQuestion();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/answer/", {
        answer: form.description,
        questionId: question?.question_id,
        id: userData.user.id,
      });

      setError("");
      // Reset the form
      e.target.reset();
    } catch (err) {
      console.log("problem", err);
      setError(err.response?.data?.msg);
    }
  };

  useEffect(() => {
    const getAnswers = async () => {
      try {
        const questionRes = await axios.get(
          `/api/answer/${question?.question_id}`
        );
        setAnswers(questionRes.data?.data);
      } catch (err) { 
        console.log("problem", err);
      }
    };
    getAnswers();
  }, [question?.question_id, answers]);

  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  return (
    <div className=" col-sm-8 mx-auto mt-5">
      <div className=" fw-light fs-5 fw-bold px-2">
        <h3>Question</h3>
        <br />
        <p>{question?.question}</p>
        <h6>{question?.question_description}</h6>
      </div>

      <div>
        {answers.length > 0 ? (
          <div className="question-outer-wraper px-2">
            <hr />
            <h4>Answer From The Community</h4>
          </div>
        ) : null}

        <div className="question-outer-wraper px-2">
          {answers.map((singleAnswer, i) => {
            return (
              <div className="answer-main-wraper row" key={i}>
                <div className="question-inner-wrapper col-1">
                  <AccountCircleIcon fontSize="large" />
                  <p className="name">{singleAnswer?.user_name}</p>
                </div>
                <div className="question-inner-wrapper2 mx-5 px-5 col-9">
                  {singleAnswer.answer}
                </div>
              </div>
            );
          })}

          {/* Answer giving section  */}
          <section className="container row col-12 mb-5">
            <div>
              <h5 className="title">Answer the above question</h5>
              <Link to="/">Go to question page</Link>
              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <br />
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows={3}
                    name="description"
                    placeholder="Your Answer..."
                    onChange={handleChange}
                  />
                </div>

                <button
                  className="btn btn-primary post-answer-button col-sm-4 col-md-4 my-3"
                  type="submit"
                >
                  Post your Answer
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Answer;
