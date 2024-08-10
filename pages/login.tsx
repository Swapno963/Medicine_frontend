import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../store/apiSlice";
import { setCredentials } from "../store/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const userData = await loginUser({ username, password }).unwrap();
      dispatch(setCredentials(userData));
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl">Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="border p-2 m-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 m-2"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 mt-2">
        Login
      </button>
    </div>
  );
};

export default Login;
