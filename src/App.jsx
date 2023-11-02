import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/main.min.css";
import Header from "./components/Header";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
};

export default App;
