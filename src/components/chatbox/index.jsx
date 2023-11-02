import moment from "moment"

export const Me = ({ message, sentAt }) => {
  return (
    <div className="w-max max-w-[15rem] overflow-auto px-2 py-1 bg-indigo-400 text-indigo-100 rounded-md float-right clear-both mt-2">
      <p className="text-[0.8rem] mr-2.5 whitespace-pre-line break-words">
        {message}
      </p>
      <span className="text-[0.55rem] float-right">
        {moment(sentAt).format("HH:mm")}
      </span>
    </div>
  );
}

export const Others = ({message, sentAt, senderName}) => {
  return (
    <div className="w-max max-w-[15rem] overflow-auto px-2 py-1 bg-indigo-200 text-indigo-500 rounded-md mt-2 float-left clear-both">
      {typeof senderName !== "undefined" && senderName !== "" ? (
        <p className="text-[0.5rem]">~{senderName}</p>
      ) : null}
      <p className="text-[0.8rem] whitespace-pre-line  break-words">
        {message}
      </p>
      <span className="text-[0.5rem] float-right">
        {moment(sentAt).format("HH:mm")}
      </span>
    </div>
  );
}
