"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProfilePage() {
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
  return (
    <div>
      <h1>Profile page</h1>
      <div className="flex justify-end mr-4">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded-xl"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
