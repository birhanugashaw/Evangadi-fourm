import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/Usercontext';
import "./AskQuestion.css"

function AskQuestion() {
  const [userData, setUserData] = useContext(UserContext);

  const navigate = useNavigate();

  // To get form data
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Axios to store asked question
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const questionAsk = await axios.post(
        "http://localhost:4000/api/question/",
        {
          id: userData.user.id,
          question: form.title,
          questionDescription: form.description,
          questionCodeBlock: "hello",
          tags: "hello",
        }
      );

      navigate("/");
    } catch (err) {
      console.log("problem", err);
      alert(err.response.data.msg);
    }
  };

  // use effect not to access ask page when isn't login
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user]);

  return (
    <div>
      {/* discription title section  */}
      <section className="discription container-fluid">
        <div className="row">
          <div className="col-12">
            <h5>Steps to write good question</h5>
            <ul>
              <li>Sumerize your problem in one-line title.</li>
              <li>Describe your problem in more detail.</li>
              <li>Describe what you tried and what you expected to happen.</li>
              <li>Review your question and post it to the site.</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Ask section  */}
      <section className="ask container row col-8 mb-5">
        <div className>
          <h5 className="title">Ask a public question</h5>
          <h6>Go to question page</h6>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                rows={2}
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
            <div className="d-grid">
              <button className="btn btn-primary btn-login post-question-button col-sm-2 col-md-4 my-3">
                Post your question
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AskQuestion