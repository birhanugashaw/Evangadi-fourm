import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import AskQuestion from "./Components/AskQuestion/AskQuestion";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Answer from "./Components/Answer/Answer";
import { UserContext } from "./context/Usercontext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";

function App() {
  const [userData, setUserData] = useContext(UserContext);

  useEffect(() => {
    const checkLoggedin = async () => {
      //check if the token already exist in local storage
      let token = localStorage?.getItem("auth-token");
      if (token === null) {
        //token doesnt exist in local storage then set auth token empty
        localStorage?.setItem("auth-token", "");
        token = "";
      } else {
        //if token exist in localstorage then use auth to verify token and get user info
        const userRes = await axios?.get("http://localhost:4000/api/users", {
          headers: { "x-auth-token": token },
        });

        // set the global state with user info
        setUserData({
          token,
          user: {
            id: userRes?.data.data.user_id,
            display_name: userRes?.data.data.user_name,
          },
        });
      }
    };
    checkLoggedin();
  }, []);
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={ <> <Header /> <Login /> </> }/>
          <Route path="/signup" element={<><Header /> <Signup /> </>} />
          <Route path="/" element={ <><Header logout={logout} /> <Home /></>}/>


  
          <Route
            path="/ask"
            element={
              <>
                {" "}
                <Header logout={logout} /> <AskQuestion />{" "}
              </>
            }
          />
          <Route
            path="/answer"
            element={
              <>
                {" "}
                <Header logout={logout} /> <Answer />{" "}
              </>
            }
          />
          <Route
            path="/:id"
            element={
              <>
                {" "}
                <Header logout={logout} /> <Answer />
              </>
            }
          />
              
             
        </Routes>
       <Footer />
      </Router>
    </div>
  );
}

export default App;
