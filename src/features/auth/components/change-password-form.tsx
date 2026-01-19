"use client";

import { UserCheck, UserX } from "lucide-react";
import { useState } from "react";

export function ChangePasswordForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const validateOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      setIsSuccess(false);
      setIsOpen(true);
      setMessage("OTP: Only numbers allowed");
      return;
    }

    if (value.length > 6) {
      setIsSuccess(false);
      setIsOpen(true);
      setMessage("OTP: Maximum 6 digits");
      return;
    }

    setOtp(value);
  };

  const forgotRepassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsOpen(true);
    setIsSuccess(null);
    setMessage("Loading...");

    try {
      const res = await fetch("/api/forgot_repassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsSuccess(false);
        setMessage(data.error || "Something went wrong");

        if (data.error === "OTP Session Time Out") {
          setTimeout(() => (window.location.href = "/"), 500);
        }
        return;
      }

      setIsSuccess(true);
      setMessage(data.message);

      setTimeout(() => {
        setIsOpen(false);
        window.location.href = "/login";
      }, 1000);
    } catch {
      setIsSuccess(false);
      setMessage("Server Error");
    }
  };

  return (
    <form
      id="forgot"
      onSubmit={forgotRepassword}
      className="w-[80%] h-[70%] flex flex-col justify-evenly items-center"
    >
      {/* OTP */}
      <div className="w-full flex flex-col gap-2">
        <label className="text-lg">OTP</label>
        <input
          type="text"
          className="border p-3 w-full rounded-2xl outline-none focus:border-gray-500 transition"
          required
          value={otp}
          onChange={validateOtp}
        />
      </div>

      {/* Password */}
      <div className="w-full flex flex-col gap-2">
        <label className="text-lg">New Password</label>
        <input
          type="password"
          className="border p-3 w-full rounded-2xl outline-none focus:border-gray-500 transition"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 rounded-full bg-gray-800 text-white hover:bg-gray-100 hover:text-gray-800 transition font-medium text-lg"
      >
        Send
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="h-[30%] w-[22%] bg-white rounded-3xl flex flex-col justify-center items-center p-4 gap-4">
            {isSuccess === null && (
              <>
                <i className="bx bx-loader-alt bx-spin text-5xl" />
                <p>{message}</p>
              </>
            )}

            {isSuccess === true && (
              <>
                <UserCheck size={40} className="text-green-600" />
                <p>{message}</p>
              </>
            )}

            {isSuccess === false && (
              <>
                <UserX size={40} className="text-red-600" />
                <p>{message}</p>
              </>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-800 text-white w-[70%] h-11.25 rounded-full hover:bg-sky-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
