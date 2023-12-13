
export function DefaultButton({text, className, ...props}) {
  return (
    <button
    className={`bg-yellow rounded-xl py-2 px-3 font-secondary font-bold hover:transition-all hover:bg-gray hover:text-white  ${className} `}   {...props}
    >
      {text}
    </button>
  )
}