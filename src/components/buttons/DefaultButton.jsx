export function DefaultButton({ text, className, ...props }) {
  return (
    <button
      {...props}
      className={`w-fit cursor-pointer rounded-xl bg-yellow px-3 py-2 font-secondary font-bold hover:bg-gray hover:text-white hover:transition-all disabled:pointer-events-none  disabled:bg-black disabled:opacity-40 ${className} `}
    >
      {text}
    </button>
  );
}
