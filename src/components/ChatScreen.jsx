import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/_AppContext";
import { FaAngleLeft } from "react-icons/fa";
import { BiPaperPlane } from "react-icons/bi";
import { Me, Others } from "./chatbox";

const ChatScreen = ({ setMessageScreen }) => {
  const {
    currentChat,
    socketState,
    SendPrivateMessage,
    SendGroupMessage,
    userInfo,
  } = useContext(AppContext);

  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);

  const ref = useRef();

  useEffect(() => {
    const roomToJoin =
      typeof currentChat?.RoomID !== "undefined" ? currentChat?.RoomID : "";
    if (roomToJoin !== "") {
      socketState.emit("join-room", roomToJoin);
    }

    ref.current.addEventListener("input", () => {
      setMessage(ref.current.innerText);
    });

    if (currentChat !== null) {
      console.log(currentChat);
      console.log(allMessage);
    }
  }, [currentChat]);

  useEffect(() => {
    if (socketState !== null) {
      socketState.on("receive-message", (newMessage) => {
        setAllMessage([...allMessage, newMessage]);
      });
    }
  }, [socketState, allMessage]);

  // useEffect(() => {
  //   console.log(message);
  // }, [message]);

  return (
    <section className="relative w-full h-full">
      <div
        id="header-div"
        className="w-full flex items-center justify-between py-3 mb-3"
      >
        <div className="w-fit flex items-center gap-x-3">
          <button
            onClick={() => {
              setMessageScreen({
                active: false,
                recipient: "",
                type: "",
                room: "",
              });
              socketState.emit("leave-room", currentChat?.RoomID);
            }}
            className="text-xl text-gray-600 hover:bg-gray-200 p-1 rounded-full"
          >
            <FaAngleLeft />
          </button>

          <div className="w-fit flex items-center gap-x-3">
            <p className="w-[2rem] h-[2rem] rounded-full grid place-content-center text-xl text-indigo-200 bg-indigo-500">
              {typeof currentChat?.Name !== "undefined"
                ? currentChat?.Name[0]
                : typeof currentChat?.AdminName !== "undefined"
                ? currentChat?.AdminName[0]
                : typeof currentChat?.RoomName !== "undefined" ? currentChat?.RoomName[0] : ""}
            </p>
            <span className="w-fit flex flex-col -mt-1">
              {typeof currentChat?.Name !== "undefined"
                ? currentChat?.Name
                : typeof currentChat?.AdminName !== "undefined"
                ? currentChat?.AdminName
                : currentChat?.RoomName}
              <span className="text-[0.6rem] -mt-0.5">Active now</span>
            </span>
          </div>
        </div>
      </div>

      {/* Message screen */}
      <div className="w-full overflow-auto">
        {allMessage.map((message, index) =>
          message.sender === userInfo.id ? (
            message.sendTo === currentChat._id ||
            message.sendTo === currentChat?.RoomID ? (
              <Me
                key={index}
                message={message.message}
                sentAt={message.dateCreated}
              />
            ) : null
          ) : (message.sendTo === userInfo.id &&
              message.type === "private" &&
              message.sender === currentChat._id) ||
            (message.type === "group" &&
              message.sendTo === currentChat.RoomID) ? (
            <Others
              key={index}
              message={message.message}
              senderName={message.senderName}
              sentAt={message.dateCreated}
            />
          ) : null
        )}
      </div>

      {/* Type message and others */}
      <form
        id="message-form"
        onSubmit={(e) => {
          e.preventDefault();
          setAllMessage([
            ...allMessage,
            {
              sender: userInfo.id,
              sendTo:
                typeof currentChat?._id !== "undefined"
                  ? currentChat?._id
                  : currentChat?.RoomID,
              message,
              dateCreated: Date.now(),
            },
          ]);
          typeof currentChat?.Name !== "undefined" ||
          typeof currentChat?.AdminName !== "undefined"
            ? SendPrivateMessage(
                currentChat?._id,
                typeof currentChat?.Name !== "undefined"
                  ? currentChat?.Name
                  : currentChat?.AdminName,
                message
              )
            : SendGroupMessage(currentChat?.RoomID, message);

          ref.current.innerText = "";
        }}
        className="w-full absolute bottom-0 flex items-end gap-x-3"
      >
        {/* <textarea name="message" id="message" className="w-full h-[1.8rem] px-2 pt-[0.17rem] text-[0.8rem] border-2 border-indigo-300 outline-none resize-none"></textarea> */}
        <div
          className="w-full min-h-[1.8rem] max-h-[6rem] px-2 py-[0.17rem] border-2 border-indigo-300 text-[0.8rem] outline-none overflow-auto"
          contentEditable={true}
          ref={ref}
        ></div>
        <button
          type="submit"
          className="p-2 rounded-full bg-indigo-300 text-indigo-700"
        >
          <BiPaperPlane />
        </button>
      </form>
    </section>
  );
};

export default ChatScreen;
