import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/Usercontext";
import "./AskQuestion.css";

function AskQuestion() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/question/", {
        id: userData.user.id,
        question: form.title,
        questionDescription: form.description,
        questionCodeBlock: "hello",
        tags: "hello",
      });
      navigate("/");
    } catch (err) {
      console.log("problem", err);
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user]);

  return (
    <div>
      <section className="discription container-fluid">
        <div className="row">
          <div className="col-12">
            <h5>Steps to write good question</h5>
            <ul>
              <li>Summarize your problem in a one-line title.</li>
              <li>Describe your problem in more detail.</li>
              <li>
                Explain what you have tried and what you expected to happen.
              </li>
              <li>Review your question and post it to the site.</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="ask container row col-8 mb-5">
        <div className>
          <h5 className="title">Ask a public question</h5>
          <Link to="/">Go to question page</Link>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                rows={1}
                placeholder="Title"
                name="title"
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="form-group">
              <textarea
                className="form-control"
                rows={3}
                placeholder="Question Description..."
                name="description"
                onChange={handleChange}
              />
            </div>
            
              <button className="btn btn-primary  post-question-button my-3">
                Post your question
              </button>
          
          </form>
        </div>
      </section>
    </div>
  );
}

export default AskQuestion;
