"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onLogin = () => {};
  return (
    <div className="flex items-center justify-center flex-col gap-5 py-10">
      <h1 className="text-xl">Login</h1>
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
        Login Here
      </button>
      <Link href="/signup" className="text-blue-600">
        Signup
      </Link>
    </div>
  );
}
