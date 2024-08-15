import { useRouter } from "next/router";
import { Configuracoes, Home, Sair, Sino } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function MenuLateral() {
    const router = useRouter()
  
    function logout() {
        localStorage.removeItem('token')
        router.push('/autenticacao')
    }

    return (
        <aside className="flex flex-col bg-gray-100">
            <div className="flex flex-col items-center justify-center h-20 w-full bg-gradient-to-r from-indigo-500 to-purple-800">
                <Logo />
            </div>
            <ul className="flex-grow">
                <MenuItem url="/" texto="Inicio" icone={Home} />
                <MenuItem url="/produto" texto="Produto" icone={Configuracoes} />
                <MenuItem url="/categoria" texto="Categoria" icone={Sino} />
            </ul>
            <ul>
                <MenuItem onClick={logout} texto="Sair" icone={Sair} className={'text-red-600 hover:bg-red-500 hover:text-white'} />
            </ul>
        </aside>
    )
}