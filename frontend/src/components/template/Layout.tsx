import Cabecalho from "./Cabecalho"
import Conteudo from "./Conteudo"
import MenuLateral from "./MenuLateral"
import Message from "./Message"
// import ProtegerRotas from '../auth/ProtegerRotas'

interface LayoutProps {
    titulo: string
    subtitulo: string
    children?: any
}

export default function Layout(props: LayoutProps) {

    return (
     
            <div className={`flex flex-row h-screen`}>
                <MenuLateral />
                <div className="flex-grow overflow-y-auto flex flex-col w-full p-7 bg-gray-300 ">
                    <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo} />
                    <Message/>
                    <Conteudo >
                        {props.children}
                    </Conteudo>
                </div>
            </div>

    )
}