import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/png"];

    // Check if the file exists and its type is valid
    if (file && validTypes.includes(file.type)) {
      setAvatar({
        file: file,
        url: URL.createObjectURL(file),
      });
    } else {
      alert("Please select a PNG or JPEG image.");
      // Clear the input if the file type is not valid
      e.target.value = "";
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);

      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account successfuly created, please Login");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    //   Login / Sign Up Page

    <div className="login">
      {/* Login Section  */}
      <div className="item">
        <h2>Welcome Back,</h2>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" name="email" />

          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Log In"}</button>
        </form>
      </div>

      {/* PAGE SEPARATOR  */}
      <div className="separator"></div>

      {/* Sign-up Section  */}
      <div className="item">
        <h2>Create an Account</h2>

        <form onSubmit={handleRegister}>
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
            accept=".png, .jpg, .jpeg"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />

          <input type="text" placeholder="Username" name="username" />

          <input type="email" placeholder="Email" name="email" />

          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
