import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import profile from "../../Images/Default_pfp.jpg";
import { UserContext } from "../../context/Usercontext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [userData, setUserData] = useContext(UserContext);
  // console.log( userData.user?.display_name )
  // console.log({userData.user?.display_name})
  const [question, setQuestion] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    // Axios to get all questions
    const getData = async () => {
      try {
        const questionRes = await axios?.get(
          "http://localhost:4000/api/question/"
        );
        setQuestion(questionRes.data.data);
        // console.log(loginRes.data.question);
      } catch (err) {
        console.log("problem", err);
        // alert(err.response.data.msg);
      }
    };

    getData();
  }, []);

  // console.log(question);

  // use effect not to access home page when isn't login
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  return (
    <div>
      <div className="col-sm-9 col-md-8 col-lg-8 mx-auto ">
        <div className="home-header my-5">
          <div>
            <Link to={"/ask"}>
              <button
                className="btn btn-outline-success ask-question-button"
                type="submit"
              >
                Ask Question
              </button>
            </Link>
          </div>
          <div className="home-welcome">
            Welcome: {userData?.user?.display_name}
          </div>
        </div>
        <h5 className="card-title fw-light fs-5 first-join fw-bold">
          Questions
        </h5>

        {/* Main question list wraper  */}
        {question?.map((singleQuestion, i) => {
          // sending question id to answer page
          var unique = singleQuestion.question_id.toString();
          // console.log(unique);

          return (
            <Link to={unique} key={i}>
              <div className="question-outer-wraper">
                <hr />
                <div className="question-main-wraper  row">
                  <div className="question-inner-wrapper col-1 ">
                    <img className="profile" src={profile} alt="pic" />
                    <p className="name">{singleQuestion.user_name}</p>
                  </div>

                  <div className="question-inner-wrapper2 mx-5 px-5 py-4 col-7">
                    {singleQuestion.question} ?<br />
                    {singleQuestion.question_description}
                  </div>

                  <div className="right px-0 py-5 col-1"></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
