"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonEnabled, setButtonEnabled] = React.useState(true);

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonEnabled(false);
    } else setButtonEnabled(true);
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success : ", response.data);
      router.push("/login");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 border-gray-500 w-auto h-auto">
      <h1 className="mb-3 text-2xl">{loading ? "Processing" : "Sign Up"}</h1>

      <label htmlFor="username">Username</label>
      <input
        className="p-2 rounded-lg border-gray-500 mb-4 focus:outline-none text-black"
        type="text"
        id="username"
        placeholder="Username"
        value={user.username}
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
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
        className=" text-black p-2 rounded-lg border-gray-500 mb-4 focus:outline-none"
        type="password"
        id="password"
        value={user.password}
        placeholder="Password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button
        onClick={onSignup}
        className="p-2 border-gray-400 rounded-lg mb-4S bg-slate-400"
        disabled={buttonEnabled}
      >
        {buttonEnabled ? "Can't SignUp" : "SignUp"}
      </button>
      <Link
        href="/login"
        className="bg-slate-800 text-white p-4 border-stone-600 rounded-lg mt-3"
      >
        Go to login page
      </Link>
    </main>
  );
}
