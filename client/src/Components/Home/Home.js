import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { UserContext } from "../../context/Usercontext";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Home() {
  const [userData, setUserData] = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/question/`);
        setQuestions(response.data.data);
         console.log(questions);
      } catch (error) {
        // console.log(error);
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
    <div className="home col-md-9 mx-auto">
      <div className="home-header my-5">
        <Link to="/ask">
          <button className="btn ask-question-button" type="submit">
            Ask Question
          </button>
        </Link>
        <div className="home-welcome d-none d-md-block">
          {userData?.user ? `Welcome: ${userData.user.display_name}` : null}
        </div>
      </div>
      <h5 className=" fs-5 fw-bold">
        {questions.length > 0 ? `Questions` : null}{" "}
      </h5>
      {questions.map((question) => {
        const idUrl = question.question_id.toString();
        return (
          <div className="question-outer-wraper " key={question.question_id}>
            <Link to={idUrl}>
              <div className="question-main-wraper row">
                <div className="mx-3 col-1">
                  <AccountCircleIcon fontSize="large" />
                  <p className="name">{question.user_name}</p>
                </div>
                <div className="mx-3 px-2 py-4 col-8">
                  {question.question}
                </div>
                <div className="py-4 col-1 rightIcon">
                  <ChevronRightIcon />
                </div>
              </div>
            </Link>

            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
