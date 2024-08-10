import { getUrl } from "@/lib";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Verify_Email() {
  const [timeLeft, setTimeLeft] = useState<number>(60); // Start at 60 seconds
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  //   for verify
  const [number, setNumber] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(timer);
    } else {
      setIsTimerActive(false);
    }
  }, [isTimerActive, timeLeft]);

  //   for try again
  const handelTryAgain = () => {
    setIsTimerActive(true);
    setTimeLeft(60);
  };
  //   for verify
  const handleSubmit = async (e: React.FormEvent) => {
    localStorage.setItem("email", "swapnom73@gmail.com");

    e.preventDefault();
    if (number === "" || isNaN(number)) {
      setError("Please enter a valid number.");
      return;
    }
    setError(null);
    console.log(number);
    const email = localStorage.getItem("email");
    const formData = new FormData();

    formData.append("email", email);
    formData.append("verificationCode", number);
    console.log(formData);
    console.log(email, number);

    try {
      const response = await axios.post(`${getUrl()}/api/auth/verify-email`, {
        email,
        verificationCode: number,
      });
      console.log(response);
      if (response.status == 0) {
        redirect("/");
      }
      if (response.ok) {
        setSuccessMessage("Number submitted successfully!");
      } else {
        setError("Failed to submit number.");
      }
    } catch (error) {
      console.log(error);

      setError("An error occurred while submitting the number.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-300 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Verify Email With in </h1>
        {timeLeft != 0 && (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(Number(e.target.value))}
              placeholder="Enter a number"
              className="border p-2 mb-4 bg-gray-600 rounded-md"
              min="1"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Submit
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {successMessage && (
              <p className="text-green-500 mt-2">{successMessage}</p>
            )}
          </form>
        )}

        <p className="text-lg">
          {timeLeft > 0 ? `Time left: ${timeLeft}s` : "Time is up!"}
        </p>
        {timeLeft == 0 && (
          <button onClick={() => handelTryAgain()}>Try again</button>
        )}
      </div>
    </div>
  );
}
