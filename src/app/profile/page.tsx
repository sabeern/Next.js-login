"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState({ _id: "", userName: "" });
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("Logout successfull", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router.push("/login");
    } catch (err) {
      toast.error("Logout failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    axios
      .get("/api/users/profile")
      .then((res) => {
        setUserDetails(res.data?.data);
      })
      .catch((err) => {
        toast.error(err.response.data?.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  }, []);
  return (
    <div className="flex justify-center flex-col m-4">
      <h1 className="text-lg font-bold flex justify-center">Profile page</h1>

      <div className="flex justify-end mr-4 w-full">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded-xl"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      {userDetails.userName && (
        <div className="flex justify-center pt-5">
          <Link href={`/profile/${userDetails?.userName}`}>
            <button
              className="bg-green-500 text-white px-4 py-1 rounded border-2 border-green-500 hover:bg-white hover:text-blue-600"
              title="Go to user view"
            >
              {userDetails?._id}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
