"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

function ProfilePage() {
  const logout = async () => {
    try {
      console.log("Started");
      const router = useRouter();
      await axios.get("/api/users/logout");
      console.log("result fetched");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="text-center mt-20 flex justify-center items-center flex-col">
      <h1>Profile Page</h1>
      <p>Profile page</p>
      <button
        className="p-2 rounded-lg mt-3 bg-blue-400 text-white active:bg-blue-600 hover:bg-blue-500"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
