import { NavLink } from "react-router-dom";

export function GoBackButton({ className, textClassName, iconClassName }) {
  return (
    <NavLink to={-1} className={`icons flex items-center gap-2 hover:opacity-50 ${className}`}>
      <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-primary/80 md:h-10 md:w-10">
        <i
          className={`ri-arrow-left-s-line flex h-8 w-8 items-center justify-center text-2xl font-normal md:text-3xl  ${iconClassName}`}
        />
      </div>
      <p className={`font-secondary text-sm font-semibold text-dark md:text-lg ${textClassName}`}>VOLVER</p>
    </NavLink>
  );
}
