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
    <div className="flex items-center justify-center">
      <h1 className="text-xl">Signup</h1>
    </div>
  );
}
