
export function DefaultButton({text, className, ...props}) {
  return (
    <button
    className={`bg-yellow rounded-xl py-2 px-1 ${className} `}   {...props}
    >
      {text}
    </button>
  )
}