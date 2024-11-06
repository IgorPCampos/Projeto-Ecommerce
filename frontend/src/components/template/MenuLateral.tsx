import { useRouter } from "next/router";
import { Configuracoes, Home, Sair, Sino } from "../../../public/icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import axios from "axios";

export default function MenuLateral() {
  const router = useRouter();

  async function logout() {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {},
      { withCredentials: true } 
    );
    router.push("/authentication");
  }

  return (
    <aside className="flex flex-col bg-gray-100">
      <div className="flex flex-col items-center justify-center h-20 w-full bg-gradient-to-r from-indigo-500 to-purple-800">
        <Logo />
      </div>
      <ul className="flex-grow">
        <MenuItem url="/" texto="Inicio" icone={Home} />
        <MenuItem url="/product" texto="Produto" icone={Configuracoes} />
        <MenuItem url="/category" texto="Categoria" icone={Sino} />
        <MenuItem url="/order" texto="Pedido" icone={Sino} />
      </ul>
      <ul>
        <MenuItem
          onClick={logout}
          texto="Sair"
          icone={Sair}
          className={"text-red-600 hover:bg-red-500 hover:text-white"}
        />
      </ul>
    </aside>
  );
}
