import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
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


  const signUp = () => {
    fetch("https://www.pre-onboarding-selection-task.shop/auth/signup",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify({
        "email": userEmail,
        "password": userPassword
      }),
    })
    .then((response) => {
      if(response.ok){
        navigator("/signin"); 
      }else{
        alert("회원가입실패! 이미 사용중인 이메일입니다.")
      }
    })
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (email && password) {
            signUp();
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
        <button data-testid="signup-button" disabled={button ? false : true}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
