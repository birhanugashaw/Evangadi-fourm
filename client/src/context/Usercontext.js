import React, { useState, createContext } from "react";

//prepare the data layer
export const UserContext = createContext();

//wrap our app and provide the data layer
export const UserProvider = (props) => {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  });

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {props.children}
    </UserContext.Provider>
  );
};
