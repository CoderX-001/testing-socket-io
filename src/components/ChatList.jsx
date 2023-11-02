import { BiFilter } from "react-icons/bi";
import BrandWelcomeMessage from "./BrandWelcomeMessage";
import { useContext } from "react";
import { AppContext } from "../context/_AppContext";

export const ChatList = ({ chatState, forPrivate, forGroup, setMessageScreen }) => {
  const { userInfo } = useContext(AppContext);

  const unreadMessages = 1

  const message = `How are you doing my dear
I've been trying to call you for a while now 
Are you okay?`
  
  const filterAnArray = (array, id, markWith) => {
    const newArray = array.filter(list => {
      return list[id] !== markWith;
    });

    return newArray;
  }

  return (
    <section className="mt-6">
      <div className="w-full flex items-center justify-between mb-2 px-4">
        <p className="capitalize text-xl">{chatState}</p>
        <button className="text-2xl text-indigo-600">
          <BiFilter />
        </button>
      </div>

      <div className="px-2">
        {/* FOR PRIVATE CHAT */}
        {chatState === "chats"
          ? forPrivate !== null
            ? forPrivate?.map((chat, index) => (
                <div
                  role="button"
                  onClick={() =>
                    setMessageScreen({
                      active: true,
                      type: "private",
                      room: chat?.RoomID,
                    })
                  }
                  key={index}
                  className="w-full flex items-center gap-x-2.5 py-2 px-1 rounded-md select-none cursor-pointer hover:bg-gray-200"
                >
                  <div
                    className={`w-[2rem] h-[2rem] rounded-full grid place-content-center text-xl text-indigo-200 bg-indigo-500`}
                  >
                    <span>
                      {filterAnArray(chat?.Users, "id", userInfo.id)[0].name[0]}
                    </span>
                  </div>
                  <div className="w-[14.5rem] -mt-0.5 flex px-1">
                    <div className="w-[11.8rem] flex flex-col">
                      <p
                        className={`${
                          unreadMessages > 0 ? "font-semibold" : "font-normal"
                        } text-[0.85rem]`}
                      >
                        {filterAnArray(chat?.Users, "id", userInfo.id)[0].name}
                      </p>
                      <span
                        className={`${
                          unreadMessages > 0 ? "font-medium" : "font-light"
                        } text-[0.7rem] -mt-0.5 truncate`}
                        title={message}
                      >
                        {message}
                      </span>
                    </div>
                    <div className="w-12 flex flex-col items-center place-items-end gap-y-0.5 -mt-0.5">
                      {unreadMessages > 0 ? (
                        <span className="text-[0.6rem] w-[1.3rem] h-[1.3rem] bg-indigo-400 font-semibold text-indigo-200 rounded-full grid place-content-center">
                          {unreadMessages}
                        </span>
                      ) : null}
                      <span className="text-[0.6rem]">11:23am</span>
                    </div>
                  </div>
                </div>
              ))
            : null
          : // FOR GROUP CHAT
          chatState === "groups"
          ? forGroup !== null
            ? forGroup?.map((chat, index) => (
                <div
                  role="button"
                  onClick={() =>
                    setMessageScreen({
                      active: true,
                      type: "group",
                      room: chat.RoomID,
                    })
                  }
                  key={index}
                  className="w-full flex items-center gap-x-2.5 py-2 px-1 rounded-md select-none cursor-pointer hover:bg-gray-200"
                >
                  <div
                    className={`w-[2rem] h-[2rem] rounded-full grid place-content-center text-xl text-indigo-200 bg-indigo-500`}
                  >
                    <span>{chat.RoomName[0]}</span>
                  </div>
                  <div className="w-[14.5rem] -mt-0.5 flex px-1">
                    <div className="w-[11.8rem] flex flex-col">
                      <p
                        className={`${
                          unreadMessages > 0 ? "font-semibold" : "font-normal"
                        } text-[0.85rem]`}
                      >
                        {chat.RoomName}
                      </p>
                      <span
                        className={`${
                          unreadMessages > 0 ? "font-medium" : "font-light"
                        } text-[0.7rem] -mt-0.5 truncate`}
                        title={message}
                      >
                        {message}
                      </span>
                    </div>
                    <div className="w-12 flex flex-col items-center place-items-end gap-y-0.5 -mt-0.5">
                      {unreadMessages > 0 ? (
                        <span className="text-[0.6rem] w-[1.3rem] h-[1.3rem] bg-indigo-400 font-semibold text-indigo-200 rounded-full grid place-content-center">
                          {unreadMessages}
                        </span>
                      ) : null}
                      <span className="text-[0.6rem]">11:23am</span>
                    </div>
                  </div>
                </div>
              ))
            : null
          : null}
      </div>
    </section>
  );
};
