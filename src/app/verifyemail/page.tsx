"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyUser", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) verifyUserEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center flex-col py-2">
      <h1 className="text-4xl ">Verify Email</h1>
      <h2 className="bg-orange-500 text-black mt-4 p-2">
        {token ? token : "No Token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
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
          <h2 className="text-2xl text-red-600">Error Verifying User</h2>
        </div>
      )}
    </div>
  );
}
