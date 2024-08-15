import Link from 'next/link'

interface MenuItemProps {
    url?: string
    texto: string
    icone: any
    className?: string
    onClick?: (evento: any) => void
}

export default function MenuItem(props: MenuItemProps) {
    function renderizarLink() {
        return (
            <div className={`flex flex-col justify-center items-center h-20 w-full text-gray-600 ${props.className}`}>
                {props.icone}
                <span className='text-sm font-light'>
                    {props.texto}
                </span>
            </div>
        )
    }
    return (
        <li onClick={props.onClick} className="hover:bg-gray-200 cursor-pointer">
            {props.url ? (
                <Link href={props.url}>
                    {renderizarLink()}
                </Link>
            ) : (
                renderizarLink()
            )}
        </li>
    )
}