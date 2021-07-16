import { Cancel, Room } from "@material-ui/icons";
import { useRef, useState, FC } from "react";
import useActions from "../../hooks/useActions";

import "./login.css";

const Login: FC<{ setShowLogin: Function }> = ({ setShowLogin }) => {
  const [error, setError] = useState<null | string>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const {loginAction} = useActions();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user = {
      email: emailRef!.current!.value,
      password: passwordRef!.current!.value,
    };
    loginAction(user, 
      () => setShowLogin(false),
      (mess: string) => setError(mess));
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>MERN-MAP</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="email" autoFocus placeholder="email" ref={emailRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {error && <span className="failure">{error}</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}

export default Login;