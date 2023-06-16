import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Todo from "./components/Todo";
import { useEffect } from "react";

function App() {
  const navigator = useNavigate();

  const RedirectPath = () => {
    const currentPath = window.location.pathname;
    const localToken = localStorage.getItem("login-token");
    if (localToken) {
      if (currentPath === "/" || currentPath === "/signup" || currentPath === "/signin") {
        navigator("todo");
      }
    } else {
      if (currentPath === "/todo") {
        navigator("/signin");
      }
    }
  };

  useEffect(() => {
    RedirectPath();
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
