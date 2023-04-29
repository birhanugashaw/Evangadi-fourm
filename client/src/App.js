import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Header from "./Pages/Header/Header";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import Footer from "./Pages/Footer/Footer";
import Home from "./Pages/Home/Home";
import Answer from "./Pages/Answer/Answer";
import { UserContext } from "./context/Usercontext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";

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
      <Header logout={logout} />
        <Routes>
          <Route path="/login" element={ <Login /> }/> 
          <Route path="/signup" element={ <Signup /> } />
          <Route path="/" element={ <Home />}/>
          <Route  path="/ask" element={ <AskQuestion />  }/>
          <Route path="/:id" element={ <Answer />} />
        </Routes>
       <Footer />
      </Router>
    </div>
  );
}

export default App;

        
           
          
              
             
      
            
              
       
           
           
            
               
             
              
             
    