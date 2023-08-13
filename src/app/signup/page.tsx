"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const onSignup = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await axios.post("/api/users/signup", user);
      console.log(result.data);
      router.push("/login");
    } catch (err: any) {
      setError(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.userName.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex items-center justify-center flex-col gap-5 py-10">
      <h1 className="text-xl">{loading ? "Processing...." : "Signup"}</h1>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="flex items-center justify-center flex-col">
        <label>Full Name</label>
        <input
          type="text"
          className="border-2 ml-4 p-2"
          placeholder="Full Name"
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
        />
      </div>
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
        onClick={onSignup}
      >
        {buttonDisabled ? "No Signup" : "Signup Here"}
      </button>
      <Link href="/login" className="text-blue-600">
        Login
      </Link>
    </div>
  );
}
