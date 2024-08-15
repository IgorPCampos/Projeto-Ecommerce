interface BotaoProps {
    type: 'submit'
    texto: string
}

export default function BotaoCriar(props: BotaoProps) {
    return (
        <button type={props.type} className='inline-block rounded-full bg-blue-700 px-5 py-3 self-start font-alt text-sm uppercase leading-none text-black hover:bg-blue-600'>{props.texto}</button>
    )
}