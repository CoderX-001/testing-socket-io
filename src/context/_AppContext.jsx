import { createContext, useEffect, useState } from "react";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [socketState, setSocketState] = useState(null);
  const [userActive, setUserActive] = useState(false);
  const [friendList, setFriendList] = useState(null);
  const [privateMessages, setPrivateMessages] = useState([]);
  const [groupMessages, setGroupMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    if (
      localStorage.getItem("loggedIn") !== "" &&
      localStorage.getItem("loggedIn") !== null
    ) {
      localStorage.getItem("loggedIn") === "true"
        ? setIsLoggedIn(true)
        : setIsLoggedIn(false);
    }

    if (
      localStorage.getItem("userInfo") !== "" &&
      localStorage.getItem("userInfo") !== null
    ) {
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    }

    if (socketState !== null) {
      socketState.on("receive-message", (message) => {
        console.log(message);
      });
    }
  }, []);

  useEffect(() => {
    if (socketState !== null) {
      socketState.emit("get-all-messages");
    }
  }, [socketState]);

  const SendPrivateMessage = (id, name, message) => {
    socketState.emit("private-message", id, name, message, (info) => {
      console.log(info);
    });
  };

  const SendGroupMessage = (room, message) => {
    console.log(room);
    socketState.emit("group-message", room, message);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userInfo,
        setUserInfo,
        socketState,
        setSocketState,
        userActive,
        setUserActive,
        friendList,
        setFriendList,
        SendGroupMessage,
        SendPrivateMessage,
        privateMessages,
        setPrivateMessages,
        setGroupMessages,
        groupMessages,
        currentChat,
        setCurrentChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
