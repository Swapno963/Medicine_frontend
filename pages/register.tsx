import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUrl } from "../lib/index";
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
    // setting in local storage for email varification
    localStorage.setItem("email", email);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await axios.post(
        `${getUrl()}/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Register
        </h1>

        <form className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-50"
          />

          <button
            onClick={(e) => handleRegister(e)}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
