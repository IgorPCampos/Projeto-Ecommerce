import Link from "next/link";

export default function Avatar() {
  return (
    <Link href={"/authentication"}>
      <div className="relative flex items-center">
        <button className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-blue-400">
          <img
            src="/images/avatar.svg"
            alt="Avatar do usuário"
            className="h-6 w-6 rounded-full mr-2"
          />
          <span className="text-white">ENTRE ou CADASTRE-SE</span>
        </button>
      </div>
    </Link>
  );
}
