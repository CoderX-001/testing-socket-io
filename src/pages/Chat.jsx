import { useContext, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AppContext } from "../context/_AppContext";
import { io } from "socket.io-client";
import { ChatList } from "../components/ChatList";
import FriendListCard from "../components/FriendListCard";
import ChatScreen from "../components/ChatScreen";

const Chat = () => {
  const {
    userInfo,
    setUserInfo,
    socketState,
    setSocketState,
    userActive,
    setUserActive,
    friendList,
    setFriendList,
    setCurrentChat,
  } = useContext(AppContext);
  const [chatState, setChatState] = useState("chats");
  const [myGroups, setMyGroups] = useState([]);
  const [messageScreen, setMessageScreen] = useState({
    active: false,
    type: "",
    recipient: "",
    room: "",
  });

  const [privateChats, setPrivateChats] = useState([]);

  // MESSAGING SCREEN
  useEffect(() => {
    if (messageScreen.active) {
      console.log("heyyy");
      if (messageScreen.recipient !== "" || messageScreen.room !== "") {
        const receiver = messageScreen.recipient || messageScreen.room;
        socketState.emit("get-recipient", receiver, (info) => {
          if (typeof info === "string") console.log(info);
          else {
            setCurrentChat(info);
          }
        });
      } else console.warn("Please add a recipient...");
    }
  }, [messageScreen]);

  // WHEN PAGE LOADS OR USER INFO CHANGES OR FRIEND LIST CHANGES
  useEffect(() => {
    if (userInfo === null) {
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    }

    if (userInfo !== null) {
      const socket = io("http://localhost:8000/", {
        path: "/chat",
        auth: {
          id: userInfo.id,
        },
      }).connect();

      setSocketState(socket);

      socket.on("connected", (value) => {
        setUserActive(value);
      });

      socket.emit("getChatLists", (message) => {
        if (Array.isArray(message)) {
          const newGroup = [];
          const newChat = [];

          for (let i = 0; i < message.length; i++) {
            if (message[i].Type === "group") {
              newGroup.push(message[i]);
            } else if (message[i].Type === "private") {
              newChat.push(message[i]);
            }
          }

          if (newGroup.length > 0) {
            if (myGroups.length > 0) {
              for (let i = 0; i < myGroups.length; i++) {
                if (myGroups[i]._id !== newGroup[i]._id) {
                  setMyGroups([...myGroups, ...newGroup]);
                }
              }
            } else setMyGroups([...myGroups, ...newGroup]);
          }

          if (newChat.length > 0) {
            if (privateChats.length > 0) {
              for (let i = 0; i < privateChats.length; i++) {
                if (privateChats[i]._id !== newChat[i]._id) {
                  setPrivateChats([...privateChats, ...newChat]);
                }
              }
            }
            else setPrivateChats([...privateChats, ...newChat]);
          }
        } else console.log(message);
      });

      socket.emit("people-ymk", (message) => {
        if (Array.isArray(message)) {
          if (friendList === null) {
            setFriendList(message);
          }
        } else console.log(message);
      });
    }
  }, [userInfo, friendList]);

  useEffect(() => console.log(privateChats), [privateChats])

  return (
    <div className="w-full min-h-[42.5rem] py-4 flex">
      {/* MESSAGE SIDEBAR */}
      <aside className="w-[30%] bg-gray-300 py-4 rounded-md">
        {/* Top menu in sidebar */}
        <div className="w-full flex items-center justify-between mb-6 px-4">
          <h2>Messages</h2>

          <div className="w-fit flex items-center gap-x-4">
            {userActive ? (
              <div className="w-fit flex items-center gap-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-[0.6rem] text-gray-500">active</span>
              </div>
            ) : null}
            <button className="bg-gray-400 text-lg p-1 rounded-full">
              <BiSearch />
            </button>
          </div>
        </div>

        {/*  */}
        <div className="w-full flex items-center justify-between px-5">
          <button
            onClick={() => setChatState("chats")}
            type="button"
            className={`relative flex items-center gap-x-1 text-xs rounded-md font-medium ${
              chatState === "chats"
                ? "text-indigo-600 after:w-[30px] after:h-[5px] after:bg-indigo-400 after:absolute after:-bottom-[6px] after:left-0 after:rounded-full after:origin-left after:transition-all after:duration-300"
                : "hover:text-indigo-600 after:w-0"
            }`}
          >
            Chats
            <span className="text-[0.6rem] rounded-full -mt-1.5">99+</span>
          </button>
          <button
            onClick={() => setChatState("groups")}
            type="button"
            className={`relative flex items-center gap-x-1 text-xs rounded-md font-medium ${
              chatState === "groups"
                ? "text-indigo-600 after:w-[30px] after:h-[5px] after:bg-indigo-400 after:absolute after:-bottom-[6px] after:left-0 after:rounded-full after:origin-left after:transition-all after:duration-300"
                : "hover:text-indigo-600 after:w-0"
            }`}
          >
            Groups
            <span className="text-[0.6rem] rounded-full -mt-1.5">99+</span>
          </button>
          <button
            onClick={() => setChatState("archived")}
            type="button"
            className={`relative flex items-center gap-x-1 text-xs rounded-md font-medium ${
              chatState === "archived"
                ? "text-indigo-600 after:w-[30px] after:h-[5px] after:bg-indigo-400 after:absolute after:-bottom-[6px] after:left-0 after:rounded-full after:origin-left after:transition-all after:duration-300"
                : "hover:text-indigo-600 after:w-0"
            }`}
          >
            Archived
            <span className="text-[0.6rem] rounded-full -mt-1.5"></span>
          </button>
        </div>

        {/* Chat list */}
        <ChatList
          chatState={chatState}
          forPrivate={privateChats}
          forGroup={myGroups}
          setMessageScreen={setMessageScreen}
        />
      </aside>
      <section className="w-[70%] relative pl-4">
        {messageScreen.active ? (
          <ChatScreen setMessageScreen={setMessageScreen} />
        ) : (
          <>
            <div className="w-full">
              <h2 className="text-xl mb-4 mt-2">People in your community</h2>
              <div className="w-full flex gap-x-4 overflow-auto">
                {friendList?.map((friend, index) =>
                  friend._id !== userInfo.id ? (
                    <FriendListCard
                      friend={friend}
                      key={index}
                      sayHi={() =>
                        setMessageScreen({
                          active: true,
                          recipient: friend._id,
                          type: "private",
                        })
                      }
                    />
                  ) : null
                )}
              </div>
            </div>

            <div className="w-full mt-12">
              <h2 className="text-xl mb-4 mt-2">Communities around you</h2>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Chat;
