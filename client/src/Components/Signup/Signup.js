import React, { useContext } from "react";
import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/Usercontext";
import axios from "../../axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Signup() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  // To get form data
  const [form, setForm] = useState({});
  // To track change in form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users", form);
      //once registered the login automatically to send the new user info to be logged in
      const loginRes = await axios.post("/api/users/login", {
        email: form.email,
        password: form.password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);
      navigate("/");
    } catch (err) {
      console.log("problem", err);
      setError(err.response.data.msg);
    }
  };
  return (
    <div className="landingPage">
      <section className="register-section container">
        <div className="row">
          {/* Register section */}
          <div className=" col-md-6 registration-box border-0 shadow rounded-3 my-4 p-4">
            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}

            <h5 className=" text-center fs-5  fw-bold mt-3 mb-4">
              Join the network
            </h5>

            <h6 className=" text-center mb-3 fw-light  ">
              Already have an account?
              <Link className="navigateLink" to={"/login"}>
                Sign In
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
              <div className="register_fname_lname_flex">
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
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
              </div>
              <button className="btn btn-primary mb-4 register_button col-md-12">
                Agree and join
              </button>

              <br />
              <div className="links mb-4 pb-4 text-center">
                I agree to the{" "}
                <Link to=" https://www.evangadi.com/legal/privacy/">
                  privacy policy{" "}
                </Link>
                and{" "}
                <Link to="https://www.evangadi.com/legal/terms/">
                  terms of service{" "}
                </Link>
                <br />
                <span className="navigateLink my-5">
                  <Link to="/login">Already have an account?</Link>
                </span>
              </div>
            </form>
          </div>

          {/* Description section  */}
          <div className="col-md-6 d-none d-md-block p-5">
            <div className="about_link">About</div>
            <h2 className=" fw-bold description_title">
              Evangadi Networks Q & A
            </h2>
            <h6 className=" mb-4 login_description">
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </h6>

            <button className="how_it_work_btn">
              <Link to="https://www.evangadi.com/explained/">HOW IT WORK</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
