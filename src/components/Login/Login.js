import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "../../firebase";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Discord_Color_Text_Logo.svg/1280px-Discord_Color_Text_Logo.svg.png"
          alt="discord logo"
        />
      </div>

      <Button onClick={signIn}>Login</Button>
    </div>
  );
}

export default Login;
