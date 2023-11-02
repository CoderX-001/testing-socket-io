import moment from 'moment';

const BrandWelcomeMessage = () => {
  const unreadMessages = 1
  const message = `We are glad to have you with us.
Meet with people of same mindset and create rapport. Chat with your community members and even people from other communities.
Welcome to Declust chat`

  return (
    <div
      className="w-full flex items-center gap-x-2.5 py-2 px-1 rounded-md select-none cursor-pointer hover:bg-gray-200"
    >
      <div
        className={`w-[2rem] h-[2rem] rounded-full grid place-content-center text-xl text-indigo-200 bg-indigo-500`}
      >
        <span>D</span>
      </div>
      <div className="w-[14.5rem] -mt-0.5 flex px-1">
        <div className="w-[11.8rem] flex flex-col">
          <p
            className={`${
              unreadMessages > 0 ? "font-semibold" : "font-normal"
            } text-[0.85rem]`}
          >
            Declust
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
        <div className="w-12 flex flex-col items-end gap-y-0.5 -mt-0.5">
          {unreadMessages > 0 ? (
            <span className="text-[0.6rem] w-[1.3rem] h-[1.3rem] bg-indigo-400 font-semibold text-indigo-200 rounded-full grid place-content-center">
              {unreadMessages}
            </span>
          ) : null}
          <span className="text-[0.6rem]">{moment(Date.now()).format("HH:mm")}</span>
        </div>
      </div>
    </div>
  );
}

export default BrandWelcomeMessage