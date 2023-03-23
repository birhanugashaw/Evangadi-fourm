import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/Usercontext";
import "./Answer.css"

import profile from "../../Images/Default_pfp.jpg";

function Answer({}) {
  const [userData, setUserData] = useContext(UserContext);
  // console.log(userData)

  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState();

  let [counter, setCounter] = useState(1);

  const navigate = useNavigate();

  // Question id from homepage
  const { id } = useParams();
  // console.log("question id " + id)

  // To get form data
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log(form.description);
  };

  // Axios to insert answer to answer table
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const questionAsk = await axios.post(
        "http://localhost:4000/api/answer/",
        {
          answer: form.description,
          questionId: id,
          id: userData.user.id,
          answerCodeBlock: "first",
        }
      );

      setCounter((value) => {
        return ++value;
      });

      navigate("/");
    } catch (err) {
      console.log("problem", err);
      alert(err.response.data.msg);
    }
  };

  // Axios to get question by id
  useEffect(() => {
    const getQuestion = async () => {
      try {
        const questionAsk = await axios?.get(
          `http://localhost:4000/api/question/${id}`
        );

        setQuestion(questionAsk?.data.data);
      } catch (err) {
        console.log("problem", err);
        // console.log(err.response.data.msg);
      }
    };
    getQuestion();
  }, []);

  // console.log(question)

  // Axios to get answers by id
  useEffect(() => {
    const getData = async () => {
      try {
        const questionRes = await axios?.get(
          `http://localhost:4000/api/answer/${id}`
        );
        setAnswers(questionRes?.data.data);
        // console.log(loginRes.data.question);
      } catch (err) {
        console.log("problem", err);
        // alert(err.response.data.msg);
      }
    };
    getData();
    console.log(answers);
  }, [counter]);

  // use effect not to access answer page when isn't login
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user]);

  return (
    <div>
      <div className="col-sm-9 col-md-8 col-lg-8 mx-auto mt-5  ">
        <div className="home-welcome flexx">
          <div className="col-9">Welcome:</div>
          <div>
            {userData?.user?.display_name}
            <br />
            <Link to={"/"}>back to home page</Link>
          </div>
        </div>
        <div className="card-title fw-light fs-5 first-join fw-bold">
          <u>Question </u>
          <br />
          <br />
          <h3>{question?.question} ?</h3>
          <h6>{question?.question_description}</h6>
        </div>

        {/* Main question list wraper  */}
        <div className="hid">
          <div className="question-outer-wraper">
            <hr />
            <h4>Answer From The Community</h4>
          </div>
          <div className="question-outer-wraper">
            <hr />

            {answers?.map((singleAnswer, i) => {
              return (
                <div className="question-main-wraper  row" key={i}>
                  <div className="question-inner-wrapper col-1 ">
                    <img className="profile" src={profile} alt="pic" />
                    <p className="name">{singleAnswer?.user_name}</p>
                  </div>
                  <div className="question-inner-wrapper2 py-5 mx-5 px-5 col-9">
                    {singleAnswer.answer}
                  </div>
                  <hr />
                </div>
              );
            })}

            {/* Answer giving section  */}
            <section className="ask container row col-12 mb-5">
              <div className>
                <h5 className="title">Answre the top  question</h5>
                <h6>Go to question page</h6>
                <form onSubmit={handleSubmit}>
                  <div className="form-group"></div>
                  <br />
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1 question"
                      rows={5}
                      name="description"
                      placeholder="Your Answer..."
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login post-question-button col-sm-4 col-md-4 my-3"
                      type="submit"
                    >
                      Post your Answer
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Answer;
