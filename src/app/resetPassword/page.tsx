"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const [emailId, setEmailId] = useState("");

  const handleClick = async () => {
    try {
      const response = await axios.post("/api/users/resetPassword", {
        emailId: emailId,
      });
      if (!response) {
        throw new Error();
      }
      window.alert(response.data.message);
      router.push("/login");
    } catch (error: any) {
      window.Error(`${error.message}, check your inbox`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-2">
      <label htmlFor="email">Email Id</label>
      <input
        className="p-4 text-black rounded-md mb-5 active:ring-1 active:ring-slate-500"
        type="text"
        id="email"
        placeholder="Enter Email address"
        value={emailId}
        onChange={(e) => setEmailId(e.target.value)}
      />
      <button
        onClick={handleClick}
        className="rounded-md p-4 bg-blue-500 hover:cursor-pointer hover:bg-blue-600 active:bg-blue-800"
      >
        Send Reset Link
      </button>
    </div>
  );
}
