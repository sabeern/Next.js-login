"use client";

import axios from "axios";
import { useState, useEffect } from "react";

export default function Verification() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const verifyEmail = async () => {
    try {
      const verify = await axios.post("/api/users/verify-email", { token });
      setStatus(verify.data?.message);
    } catch (err: any) {
      setStatus(err.response.data?.error);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);
  return <div> {status ? status : "Verification under process ..."}</div>;
}
