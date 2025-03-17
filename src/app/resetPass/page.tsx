"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function resetPage() {
  const [token, setToken] = useState("");
  const [reset, setReset] = useState(false);
  const [error, setError] = useState(false);
  const [newPass, setNewPass] = useState("");

  const resetPassword = async () => {
    try {
      await axios.post("/api/users/resetPassword", { token, newPass });
      setReset(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  //   useEffect(() => {
  //     if (token.length > 0) resetPassword();
  //   }, [token]);

  return (
    <div className="flex items-center justify-center flex-col py-2">
      <h1 className="text-4xl ">Reset Password</h1>
      <h2 className="bg-orange-500 text-black mt-4 p-2">
        {token ? token : "No Token"}
      </h2>
      <input
        type="password"
        name="password"
        id="pass"
        className="p-2 text-black"
        placeholder="Enter new Password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />
      <button
        onClick={resetPassword}
        className="bg-blue-500 hover:cursor-pointer hover:bg-blue-600 active:bg-blue-800 p-2 text-white"
      >
        Reset
      </button>
      {reset && (
        <div>
          <h2 className="text-2xl">Password Reset Successfully</h2>
          <Link
            className="rounded-md bg-blue-500 active:cursor-pointer"
            href="/login"
          >
            Login Now
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl text-red-600">Error Resetting Password</h2>
        </div>
      )}
    </div>
  );
}
