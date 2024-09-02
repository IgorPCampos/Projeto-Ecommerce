import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/home"}>
      <div className="flex flex-col items-center justify-center bg-white h-10 w-10 rounded-full">
        <div className="h-3 w-3 rounded-full bg-red-600 mb-0.5" />
        <div className="flex mt-0.5">
          <div className="h-3 w-3 rounded-full bg-yellow-500 mr-0.5"></div>
          <div className="h-3 w-3 rounded-full bg-green-500 ml-0.5"></div>
        </div>
      </div>
    </Link>
  );
}
