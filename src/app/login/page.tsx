"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onLogin = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/users/login", user);
      toast.success("Login successfull", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router.push("/profile");
    } catch (err: any) {
      toast.error(err.response.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center flex-col gap-5 py-10">
      <h1 className="text-xl">{loading ? "Processing...." : "Login"}</h1>
      <div className="flex items-center justify-center flex-col">
        <label>Email</label>
        <input
          type="email"
          className="border-2 ml-4 p-2"
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="flex items-center justify-center flex-col">
        <label>Password</label>
        <input
          type="password"
          className="border-2 ml-4 p-2"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <button
        className="px-4 py-2 rounded-xl text-white bg-blue-500 border-2 border-blue-500 hover:bg-white hover:text-red-500"
        onClick={onLogin}
      >
        {buttonDisabled ? "No Login" : "Login Here"}
      </button>
      <Link href="/signup" className="text-blue-600">
        Signup
      </Link>
    </div>
  );
}
