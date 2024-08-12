import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";

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


  const handleLogin = e => {
    e.preventDefault()

  }
  return (
    //   Login / Sign Up Page

    <div className="login">
      {/* Login Section  */}
      <div className="item">
        <h2>Welcome Back,</h2>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" name="email" />

          <input type="password" placeholder="Password" name="password" />
          <button>Log In</button>
        </form>
      </div>

      {/* PAGE SEPARATOR  */}
      <div className="separator"></div>

      {/* Sign-up Section  */}
      <div className="item">
        <h2>Create an Account</h2>

        <form>
          <label htmlFor="file">
            <img
              src={avatar.url || "./avatar.png"}
              alt="Your Profile Picture"
            />
            Upload an image
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
