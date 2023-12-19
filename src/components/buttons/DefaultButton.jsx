export function DefaultButton({ text, className, ...props }) {
  return (
    <button
      {...props}
      className={`w-fit rounded-xl bg-yellow px-3 py-2 font-secondary font-bold hover:bg-gray hover:text-white hover:transition-all  ${className} `}
    >
      {text}
    </button>
  );
}
