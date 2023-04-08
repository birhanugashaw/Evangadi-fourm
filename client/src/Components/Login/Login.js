import React, { useContext, useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/Usercontext";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // To get form data
  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Axios to login
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logging user
    try {
      const loginRes = await axios.post(
        "https://sendme-api.onrender.com/api/users/login",
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
  useEffect(() => {
    if (userData.user) navigate("/");
  }, [userData.user, navigate]);
  return (
    <div className="landing">
      {/* Login Section  */}
      <section className="login-section">
        <div className="container">
          <div className="row">
            {/* First part login  */}
            <div className="col-sm-9 col-md-7 col-lg-6 mx-auto " id="login">
              <div className="card border-0 shadow rounded-3 my-4">
                <div className="card-body p-4 p-sm-5 all">
                  <h5 className="card-title text-center fw-light fs-5 first-join fw-bold mb-4 mt-5 pt-2">
                    Login to your account
                  </h5>
                  <h6 className="text-center mb-3 fw-light  ">
                    Don't have an account?
                    <Link className="create-link" to={"/signup"}>
                      <span> Create an account ? </span>
                    </Link>
                  </h6>
                  <form onSubmit={handleSubmit}>
                    <div className=" mb-3">
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                      />
                    </div>

                    <div className=" mb-3">
                      <div className="input-group">
                        <input
                          className="form-control"
                          type={showPassword ? "text" : "password"} // toggle password visibility based on state
                          name="password"
                          onChange={handleChange}
                          placeholder="Password"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="d-grid">
                      <button
                        className="btn btn-primary btn-login submit-button col-md-4"
                        type="submit"
                      >
                        Submit
                      </button>
                      <div className="form-check mb-3 mt-3 text-center">
                        <span>
                          <Link className="create-link" to={"/signup"}>
                            Create an account ?
                          </Link>
                        </span>
                      </div>
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
                    Evangadi Networks Q & A
                  </h2>
                  <h6 className="card-title  mb-4 fw-light login-description">
                    No matter what stage of life you are in, whether you’re just
                    starting elementary school or being promoted to CEO of a
                    Fortune 500 company, you have much to offer to those who are
                    trying to follow in your footsteps.
                  </h6>
                  {/* <h6 className="login-description mb-5">
                    Wheather you are willing to share your knowledge or you are
                    just looking to meet mentors of your own, please start by
                    joining the network here.
                  </h6> */}
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

export default Login;
