interface ButtonProps {
    label:string;
    secondary?:boolean;
    fullWidth?:boolean;
    large?:boolean;
    onClick: ()=>void;
    disabled?:boolean
    outlined?:boolean
}

const Button:React.FC<ButtonProps> = ({
    label,
    secondary,
    fullWidth,
    large,
    onClick,
    disabled,
    outlined,
}) => {
  return (
    <button 
    disabled={disabled}
    onClick={onClick}
    className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-full
        font-semibold
        border-2
        hover:opacity-80
        transition
        ${fullWidth?'w-full':'w-fit'}
        ${secondary?'bg-white':'bg-sky-500'}
        ${secondary?'text-black':'text-white'}
        ${secondary?'border-black':'border-sky-500'}
        ${large?'text-xl':'text-md'}
        ${large?'px-5':'px-4'}
        ${large?'py-3':'py-2'}
        ${outlined?'bg-transparent':''}
        ${outlined?'border-white':''}
        ${outlined?'text-white':''}

    `}>{label}</button>
  )
}

export default Button