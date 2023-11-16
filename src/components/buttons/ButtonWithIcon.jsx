export function ButtonWithIcon({ classname, icon, onClick, text, textClassname }) {
  return (
    <>
      <button
        className={`${classname} flex items-center justify-around bg-yellow  px-5 py-2 shadow-sm transition hover:opacity-50`}
        onClick={onClick}
      >
        <i className={`${icon} icons transition`} />
        <span className={`${textClassname}`}>{text}</span>
      </button>
    </>
  );
}
