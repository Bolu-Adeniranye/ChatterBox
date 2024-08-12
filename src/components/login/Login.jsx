import { useState } from "react";
import "./login.css";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0])
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
  };
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back</h2>
        <form>
          <input type="email" placeholder="Email" name="email" />

          <input type="password" placeholder="Password" name="password" />
          <button>Log In</button>
        </form>
      </div>

      <div className="separator"></div>

      <div className="item">
        <h2>Create an Account</h2>
        <form>
          <label htmlFor="file">
            <img
              src={avatar.url || "./avatar.png"}
              alt="Your Profile Picture"
              width={250}
            />
            Upload a Profile Picture
          </label>
          <input
            type="file"
            name="email"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />

          <input type="text" placeholder="Username" name="username" />

          <input type="email" placeholder="Email" name="email" />

          <input type="password" placeholder="Password" name="password" />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
