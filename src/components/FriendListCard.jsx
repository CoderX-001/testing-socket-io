import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { PiHandWavingFill } from "react-icons/pi";

const FriendListCard = ({friend, sayHi}) => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className="relative w-fit bg-indigo-100 py-4 px-3 rounded-md shadow-md flex flex-col items-center">
      <div className="absolute top-2 right-1.5">
        <button onClick={() => setDropDown(!dropDown)} className="w-[20px] h-[20px] rounded-full grid place-content-center hover:bg-indigo-200 hover:text-indigo-500">
          <BiDotsVerticalRounded />
        </button>
        <div className={`${dropDown ? "w-[130px]" : "w-0"} bg-indigo-200 absolute z-40 rounded-md overflow-hidden shadow-md`}>
          <button className="text-xs text-center block w-full py-1.5 hover:bg-indigo-400 hover:text-indigo-100">Remove from list</button>
          <button className="text-xs text-center text-red-500 block w-full py-1.5 hover:bg-red-500 hover:text-indigo-100">Report this person</button>
        </div>
      </div>
      <div className="w-[3rem] h-[3rem] rounded-full grid place-content-center text-2xl text-indigo-200 bg-indigo-500">
        <span>{typeof friend?.Name !== "undefined" ? friend?.Name[0] : friend?.AdminName[0]}</span>
      </div>
      <p className="text-[0.8rem]">{friend?.Name || friend?.AdminName}</p>
      <span className="text-[0.65rem] mb-0.5">{friend.Email}</span>
      <span className="text-[0.6rem] mb-4">
        Community:&nbsp;<b>{friend?.CommunityCode}</b>
      </span>
      <div className="w-fit flex flex-col items-center gap-3">
        <button onClick={sayHi} className="flex items-center gap-x-1 text-[0.6rem] bg-indigo-400 text-indigo-100 px-2 py-1 rounded-md shadow-md">
          Say hi
          <span className="text-[0.9rem]"><PiHandWavingFill /></span>
        </button>
        <button className="text-[0.6rem] bg-indigo-50 text-indigo-400 px-2 py-1 rounded-md shadow-md">
          View profile
        </button>
      </div>
    </div>
  );
}

export default FriendListCard;