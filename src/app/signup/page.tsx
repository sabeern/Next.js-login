"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function SignupPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const onSignup = async () => {};
  return (
    <div className="flex items-center justify-center flex-col gap-5 py-10">
      <h1 className="text-xl">Signup</h1>
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
        Signup Here
      </button>
      <Link href="/login" className="text-blue-600">
        Login
      </Link>
    </div>
  );
}
