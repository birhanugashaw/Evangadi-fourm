import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import profile from "../../Images/Default_pfp.jpg";
import { UserContext } from "../../context/Usercontext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function Home() {
  const [userData, setUserData] = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  // const handleLike = async (id) => {
  //   try {
  //     await axios.put(`https://send-api.onrender.com/api/question/${id}/like`);
  //     const response = await axios.get("https://send-api.onrender.com/api/question/");
  //     setQuestions(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleDislike = async (id) => {
  //   try {
  //     await axios.put(`https://send-api.onrender.com/api/question/${id}/dislike`);
  //     const response = await axios.get("https://send-api.onrender.com/api/question/");
  //     setQuestions(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://send-api.onrender.com/api/question/");
        setQuestions(response.data.data);
        console.log(questions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!userData?.user) {
      navigate("/login");
    }
  }, [userData?.user, navigate]);

  return (
    <div className="col-sm-9 col-md-8 col-lg-8 mx-auto">
      <div className="home-header my-5">
        <Link to="/ask">
          <button
            className="btn btn-outline-success ask-question-button"
            type="submit"
          >
            Ask Question
          </button>
        </Link>
        <div className="home-welcome">
          {userData?.user ? `Welcome: ${userData.user.display_name}` : null}
        </div>
      </div>
      <h5 className="card-title fw-light fs-5 first-join fw-bold">Questions</h5>
      {questions.map((question) => {
        const unique = question.question_id.toString();
        return (
          <div className="question-outer-wraper " key={question.question_id}>
            <Link to={unique}>
              <div className="question-main-wraper row">
                <div className="question-inner-wrapper col-1">
                  <img className="profile" src={profile} alt="pic" />
                  <p className="name">{question.user_name}</p>
                </div>
                <div className="question-inner-wrapper2 mx-5 px-5 py-4 col-7">
                  {question.question}
                </div>
                <div className="right px-0 py-5 col-1"> </div>
              </div>
            </Link>
            {/* <div>
              <button
                className="btn btn-outline-success"
                onClick={() => handleLike(question.question_id)}
              >
                <ThumbUpIcon />
              </button>
            </div>
            <div>
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDislike(question.question_id)}
              >
                <ThumbDownIcon />
              </button>
            </div> */}
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
