import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigator = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [button, setButton] = useState(false);

  useEffect(() => {
    if (email && password) {
      setButton(true);
    }
  }, [email, password]);


  const signIn = () => {
    fetch("https://www.pre-onboarding-selection-task.shop/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    })
      .then((response) => {
          return response.json();
      })
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("login-token", data.access_token);
          navigator("/todo");
        }else{
          alert("아이디나 비밀번호가 잘못되었습니다.")
        }
      });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (email && password) {
            signIn();
          }
        }}
      >
        <input
          type="email"
          data-testid="email-input"
          onChange={(e) => {
            if (e.target.value.includes("@")) {
              setUserEmail(e.target.value);
              setEmail(true);
            }
          }}
        />
        <input
          type="password"
          data-testid="password-input"
          onChange={(e) => {
            if (e.target.value.length >= 8) {
              setUserPassword(e.target.value);
              setPassword(true);
            }
          }}
        />
        <button data-testid="signin-button" disabled={button ? false : true}>
          로그인
        </button>
      </form>
      <button
        onClick={() => {
          navigator("/signup");
        }}
      >
        회원가입 하기
      </button>
    </div>
  );
};

export default SignIn;
