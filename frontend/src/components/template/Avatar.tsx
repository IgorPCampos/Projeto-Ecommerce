import Link from "next/link";
import { useState } from "react";
import { Usuario, Sair } from "../icons";

export default function Avatar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
            <Link href="/compras">
                <img src={'/images/shoPcart.svg'} alt="Carrinho de compras" className="h-10 w-10 rounded-full cursor-pointer mr-6" />
            </Link>
            <div className="relative">

                <img
                    src="/images/avatar.svg"
                    alt="Avatar do usuário"
                    className="h-10 w-10 rounded-full cursor-pointer mr-3"
                    onClick={toggleDropdown}
                />
                {dropdownOpen && (
                    <div className="absolute top-12 right-0 bg-white border rounded-lg shadow-md">
                        <ul>
                            <li>
                                <Link href="/authentication" className="flex hover:bg-slate-200 text-black">
                                    {Usuario}
                                    <p className="pl-1 mr-1">Perfil</p>
                                    
                                </Link>
                            </li>
                            <li>
                                <Link href="/logout" className="flex hover:bg-slate-200 text-black">
                                    {Sair}
                                    <p className="pl-1">Sair</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
