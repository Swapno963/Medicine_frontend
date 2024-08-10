import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../store/apiSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser] = useRegisterUserMutation();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Response:", response.data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl">Register</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="border p-2 m-2 bg-gray-500"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 m-2 bg-gray-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 m-2 bg-gray-500"
      />
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 m-2"
      />
      <button
        onClick={(e) => handleRegister(e)}
        className="bg-blue-500 text-white p-2 mt-2"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
