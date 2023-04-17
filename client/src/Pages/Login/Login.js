import React, { useContext, useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/Usercontext";
import axios from "../../axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  const [userData, setUserData] = useContext(UserContext);
  const [error, setError] = useState(null);
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
      const response = await axios.post("/api/users/login", {
        email: form.email,
        password: form.password,
      });
      console.log(response);
      setUserData({
        token: response.data.token,
        user: response.data.user,
      });
      localStorage.setItem("auth-token", response.data.token);
      navigate("/");
    } catch (err) {
      console.log("problem", err);
      setError(err.response.data.msg);
    }
  };
  useEffect(() => {
    if (userData.user) navigate("/");
  }, [userData.user, navigate]);
  return (
    <div className="landingPage">
      <section className="login-section container ">
        <div className="row">
          {/* login section  */}
          <div className=" col-md-5 login-box border-0 shadow rounded-3 my-4 p-4 ">
            {error && (
              <div className="alert alert-danger text-center " role="alert">
                {error}
              </div>
            )}
            <h5 className="text-center fw-light fs-5  fw-bold mb-4 mt-5">
              Login to your account
            </h5>
            <h6 className="text-center mb-3 fw-light  ">
              Don't have an account?
              <Link className="navigateLink" to={"/signup"}>
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

              <div className="text-center">
                <button
                  className="btn btn-primary submit_button "
                  type="submit"
                >
                  Submit
                </button>
                <div className="form-check mb-3 mt-3 text-center">
                  <span>
                    <Link className="navigateLink" to={"/signup"}>
                      Create an account ?
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* description section  */}

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

export default Login;
