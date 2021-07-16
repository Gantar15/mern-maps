import { Cancel, Room } from "@material-ui/icons";
import { FC } from "react";
import { useRef, useState } from "react";
import useActions from "../../hooks/useActions";

import "./register.css";

const Register: FC<{setShowRegister: Function}> = ({ setShowRegister }) => {
  const [error, setError] = useState<null | String>(null);
  const [success, setSuccess] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const {registrationAction} = useActions();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef!.current!.value,
      email: emailRef!.current!.value,
      password: passwordRef!.current!.value,
    };

    registrationAction(newUser, 
      () => {
        setSuccess(true); 
        setShowRegister(false)},
      (mess: string) => setError(mess));
  };
  
  return (
    <div className="registerContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>MERN-MAP</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="registerBtn" type="submit">
          Register
        </button>
        {error && <span className="failure">{error}</span>}
        {success && <span className="success">Successfull. You can login now!</span>}
      </form>
      <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
}

export default Register;