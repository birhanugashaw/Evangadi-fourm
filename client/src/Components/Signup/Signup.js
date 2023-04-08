import React, { useContext, useEffect } from "react";
import "../Login/Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/Usercontext";
import axios from "axios";

function Signup() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // To get form data
  const [form, setForm] = useState({});
  // To track change in form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    //   console.log(form.user)
  };

  // Axios to signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // sending data to the registred database
      await axios.post("https://send-api.onrender.com/api/users", form);
      //once registered the login automatically to send the new user info to be logged in
      const loginRes = await axios.post(
        "https://send-api.onrender.com/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);
      navigate("/");
    } catch (err) {
      console.log("problem", err);
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="landing">
      {/* Login Section  */}
      <section className="login-section">
        <div className="container">
          <div className="row">
            {/* First Part create account */}
            <div className="col-sm-9 col-md-7 col-lg-6 mx-auto " id="create">
              <div className="card border-0 shadow rounded-3 my-4">
                <div className="card-body p-4 p-sm-5 all">
                  <h5 className="card-title text-center fw-light fs-5 first-join fw-bold">
                    Join the network
                  </h5>

                  <h6 className="card-title text-center mb-3 fw-light  ">
                    Already have an account?
                    <Link className="create-link" to={"/login"}>
                      <span className="create-link">Sign In</span>
                    </Link>
                  </h6>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="login-flex">
                      <div className=" mb-3">
                        <input
                          type="text"
                          name="firstName"
                          className="form-control"
                          placeholder="First Name"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3 second">
                        <input
                          type="text"
                          name="lastName"
                          className="form-control"
                          placeholder="Last Name"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className=" mb-3">
                      <input
                        type="text"
                        name="userName"
                        className="form-control"
                        placeholder="User Name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control mb-3"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                      />
                    </div>
                    <div className="d-grid">
                      <button className="btn btn-primary btn-login login-button col-md-12">
                        Agree and join
                      </button>
                    </div>
                    <br />
                    <div className="form-check mb-4 pb-4 text-center">
                      I agree to the
                      <Link to=" https://www.evangadi.com/legal/privacy/">
                        privacy policy
                      </Link>
                      and
                      <Link to="https://www.evangadi.com/legal/terms/">
                        terms of service
                      </Link>
                      <br />
                      <span className="create-link my-4">
                        <Link to="/login">Already have an account?</Link>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Second Part  */}
            <div className="col-sm-9 col-md-7 col-lg-6 mb-2 mx-auto">
              <div className="  my-5">
                <div className="card-body p-4 p-sm-5 all">
                  <div className="about-link">About</div>
                  <h2 className="card-title fw-light  fw-bold evangadi-title">
                    Evangadi Networks Q&amp;A
                  </h2>
                  <h6 className="card-title  mb-4 fw-light login-description">
                    No matter what stage of life you are in, whether you’re just
                    starting elementary school or being promoted to CEO of a
                    Fortune 500 company, you have much to offer to those who are
                    trying to follow in your footsteps.
                  </h6>
                  <div className="d-grid">
                    <button className="how-it-work-button">
                      <a href="https://www.evangadi.com/explained/">
                        HOW IT WORK
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
