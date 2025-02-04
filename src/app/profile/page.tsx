"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function ProfilePage() {
  const router = useRouter();
  const [id, setId] = useState("Nothing");
  const [userName, setUserName] = useState("No User");
  const logout = async () => {
    try {
      console.log("Started");

      await axios.get("/api/users/logout");
      console.log("result fetched");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res);
    setId(res.data.user._id);
    setUserName(res.data.user.username);
  };

  return (
    <div className="text-center mt-20 flex justify-center items-center flex-col">
      <h1>Profile Page</h1>
      <p>Profile page</p>
      <h2 className="bg-blue-300 rounded-lg p-3 mt-1 mb-1">
        {id === "Nothing" ? (
          "Nothing to show"
        ) : (
          <Link
            className="bg-red-400 rounded-lg p-3 mt-1 mb-1"
            href={`/profile/${userName}`}
          >
            {id}
          </Link>
        )}
      </h2>
      <button
        className="p-2 rounded-lg mt-3 bg-blue-400 text-white active:bg-blue-600 hover:bg-blue-500"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="p-2 rounded-lg mt-3 bg-green-400 text-white active:bg-green-600 hover:bg-green-500"
        onClick={getUserDetails}
      >
        Get Data
      </button>
    </div>
  );
}

export default ProfilePage;
