import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/_AppContext";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn, setUserInfo } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate()

  const HandleSubmit = async (e) => {
    e.preventDefault();
    email === "" ?
      setEmailError("Please provide an email address.") : setEmailError("")

    password === "" ?
      setPasswordError("Please provide a password.") : setPasswordError("");
    
    
    if (email !== "" && password !== "") {
      try {
        const data = {
          uid: email,
          password: password
        };

        const res = await axios.post("http://localhost:8000/v0/auth/login/user", data);
        
        if (res.status === 200) {
          const userInfo = JSON.stringify(res.data.data);
          localStorage.setItem("userInfo", userInfo);
          localStorage.setItem("loggedIn", true);
          setUserInfo(res.data.data);
          setIsLoggedIn(true);

          navigate("/chat");
        }
        else throw new Error(res);
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/chat");
    }
  }, [isLoggedIn])
  
  return (
    <form onSubmit={HandleSubmit} className="max-w-[40rem] w-full mx-auto bg-indigo-200 rounded-lg mt-[15vh] py-12 flex flex-col items-center gap-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Sign in to continue</h2>
        <p className="text-sm">Please fill the fields appropriately</p>
      </div>
      <div className="max-w-[25rem] w-full flex flex-col mt-7">
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-sm px-4 py-2 shadow-md rounded-md outline-none focus:border-[1px] focus:border-indigo-400 placeholder:text-indigo-600 placeholder:text-sm" placeholder="Email" autoComplete="off" />
        <span className="text-xs mt-0.5 ml-1 text-red-500">{emailError}</span>
      </div>

      <div className="max-w-[25rem] w-full flex flex-col">
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-sm px-4 py-2 shadow-md rounded-md outline-none focus:border-[1px] focus:border-indigo-400 placeholder:text-indigo-600 placeholder:text-sm" placeholder="Password" autoComplete="off" />
        <span className="text-xs mt-0.5 ml-1 text-red-500">{passwordError}</span>
      </div>

      <button type="submit" className="max-w-[10rem] w-full py-2 rounded-md shadow-lg bg-indigo-600 text-indigo-100">Sign in</button>
    </form>
  )
}

export default Login