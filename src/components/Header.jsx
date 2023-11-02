import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../context/_AppContext"

const Header = ({ children }) => {
  const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo } = useContext(AppContext);

  const navigate = useNavigate();

  const [dropDown, setDropDown] = useState(false);

  const Logout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("loggedIn");
    setDropDown(false);
  }

  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== null && localStorage.getItem("loggedIn") !== "") {
      setIsLoggedIn(true)
    }

    setInterval(() => {
      if (localStorage.getItem("userInfo") === null || localStorage.getItem("userInfo") === "") {
        setUserInfo(null);
        navigate("/");
      }

      if (localStorage.getItem("loggedIn") === null || localStorage.getItem("loggedIn") === "") {
        setIsLoggedIn(false);
        navigate("/");
      }
    }, 500);
  }, [])

  return (
    <>
      <nav className="w-full h-16 bg-indigo-400 px-14 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-indigo-100">ChatHouse</h1>

        {isLoggedIn ? (
          <span className="block relative select-none" role="button">
            <p
              onClick={() => setDropDown(!dropDown)}
              className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-400 font-medium uppercase grid place-content-center"
            >
              {typeof userInfo.name !== "undefined"
                ? userInfo.name[0]
                : userInfo.adminName[0]}
            </p>
            <div
              className={`w-[8rem] ${
                dropDown ? "h-fit" : "h-0"
              } absolute z-50 -right-4 bg-indigo-300 flex flex-col overflow-hidden rounded-md mt-2 text-sm transition-[height] duration-200`}
            >
              <p className="w-full py-2 bg-indigo-600 text-indigo-100 text-center flex flex-col">
                <span className="text-sm">
                  {typeof userInfo.name !== "undefined"
                    ? userInfo.name
                    : userInfo.adminName}
                </span>
                <span className={userInfo.role === "user" ? "text-xs" : "text-[0.6rem]"}>{userInfo.role}</span>
              </p>
              <Link className="py-2 text-center hover:bg-indigo-100">
                Profile
              </Link>
              <button
                onClick={Logout}
                className="py-2 hover:bg-red-500 hover:text-indigo-100"
              >
                Log out
              </button>
            </div>
          </span>
        ) : null}
      </nav>

      <main className="w-full px-4">{children}</main>

      <footer className="w-full bg-gray-300 absolute bottom-0 py-5 px-14 flex items-center justify-between">
        <h1 className="text-lg text-indigo-400 font-semibold">ChatHouse</h1>

        <div className="w-fit flex items-center gap-x-7">
          <Link to="" className="hover:text-indigo-600">
            Home
          </Link>
          <Link to="" className="hover:text-indigo-600">
            Chat
          </Link>
          <Link to="" className="hover:text-indigo-600">
            Contact
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Header