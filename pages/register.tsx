import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../redux/apiSlice";
import { setCredentials } from "../redux/authSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser] = useRegisterUserMutation();
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      const userData = await registerUser({
        username,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials(userData));
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl">Register</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="border p-2 m-2"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 m-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 m-2"
      />
      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white p-2 mt-2"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
