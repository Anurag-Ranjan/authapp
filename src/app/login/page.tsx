"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [isDisabled, setDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabled(false);
    } else setDisabled(true);
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success ", response.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 border-gray-500 w-auto h-auto">
      <h1 className="mb-3 text-2xl">{loading ? "Processing" : "Login"}</h1>
      <label htmlFor="email">Email</label>
      <input
        className="p-2 rounded-lg border-gray-500 mb-4 focus:outline-none text-black"
        type="text"
        id="email"
        value={user.email}
        placeholder="Email"
        onChange={(event) => {
          setUser({ ...user, email: event.target.value });
        }}
      />
      <label htmlFor="username">Password</label>
      <input
        className="p-2 rounded-lg border-gray-500 mb-4 focus:outline-none text-black"
        type="password"
        id="password"
        value={user.password}
        placeholder="Password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button
        onClick={onLogin}
        className="p-2 border-gray-400 rounded-lg mb-4S bg-slate-400"
        disabled={isDisabled}
      >
        {isDisabled ? "No login" : "Login Here"}
      </button>
      <Link
        href="/signup"
        className="bg-slate-800 text-white p-4 border-stone-600 rounded-lg mt-3"
      >
        Go to Signup page
      </Link>
    </main>
  );
}
