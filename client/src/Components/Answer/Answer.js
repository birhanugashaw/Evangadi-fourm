import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/Usercontext";
import "./Answer.css";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Answer() {
  const [userData, setUserData] = useContext(UserContext);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [form, setForm] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/answer/", {
        answer: form.description,
        questionId: id,
        id: userData.user.id,
        answerCodeBlock: "first",
      });
      setIsFormSubmitted(true);
      e.target.reset();
    } catch (err) {
      console.log("problem", err);
      alert(err.response?.data?.msg);
    }
  };

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const questionAsk = await axios.get(
          `/api/question/${id}`
        );
        setQuestion(questionAsk.data?.data);
      } catch (err) {
        console.log("problem", err);
      }
    };
    getQuestion();
  }, [id]);
  // console.log(question)
  useEffect(() => {
    const getAnswers = async () => {
      try {
        const questionRes = await axios.get( `/api/answer/${id}`);
        setAnswers(questionRes.data?.data);
      } catch (err) {
        console.log("problem", err);
      }
    };
    getAnswers();
  }, [id, isFormSubmitted]);
        console.log(answers);

  useEffect(() => {
    if (!userData.user) {
      navigate("/login");
    }
  }, [userData.user]);

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
                  <AccountCircleIcon fontSize="large"/>
                    <p className="name">{singleAnswer?.user_name}</p>
                  </div>
                  <div
                    className="question-inner-wrapper2 mx-5 px-5 col-9"
                  >
                    {singleAnswer.answer}
                  </div>
                </div>
              );
            })}

            {/* Answer giving section  */}
            <section className="container row col-12 mb-5">
              <div>
                <h5 className="title">Answer the above question</h5>
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
