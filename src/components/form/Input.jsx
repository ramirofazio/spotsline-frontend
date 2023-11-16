export function Input({
  label = false,
  type = "text",
  icon = false,
  placeholder,
  classname,
  inputClassname,
  labelClassname,
  props,
}) {
  return (
    <div className={`${classname} flex rounded-full bg-black/5 px-4 py-1`}>
      {label && <label className={`${labelClassname} `}>{label}</label>}
      <input
        className={`${inputClassname} w-80 bg-transparent text-sm focus:outline-none`}
        placeholder={placeholder}
        type={type}
        {...props}
      />
      {icon && <i className={`${icon} text-gray group-focus:opacity-10`} />}
    </div>
  );
}
