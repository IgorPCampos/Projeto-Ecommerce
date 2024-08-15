    interface InputProps {
        type: string
        name: string
        id: string
        required?: boolean
    }

    export default function Input(props: InputProps) {
        return (
            <input type={props.type} name={props.name} id={props.id} required={props.required} className='mx-1 rounded border-gray-400 bg-gray-600 text-white' />
        )
    }