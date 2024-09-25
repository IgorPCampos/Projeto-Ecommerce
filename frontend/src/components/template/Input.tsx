interface InputProps {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
}

export default function Input(props: InputProps) {
  return (
    <input
      type={props.type}
      name={props.name}
      id={props.id}
      required={props.required}
      placeholder={props.placeholder}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
    />
  );
}
