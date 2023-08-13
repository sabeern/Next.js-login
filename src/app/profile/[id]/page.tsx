import Link from "next/link";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex justify-center mt-24">
      <h1 className="text-xl text-gray-600 font-bold">
        Hello welcome {params.id}
      </h1>
      <Link href="/profile" className="text-blue-600 mt-20 block">
        Go Profile
      </Link>
    </div>
  );
}
