import { NavLink } from "react-router-dom";

export function GoBackButton({ className, textClassName, iconClassName }) {
  return (
    <NavLink to={-1} className={`icons absolute left-4 top-4 flex items-center hover:opacity-50 ${className}`}>
      <i className={`ri-arrow-left-s-line yellowGradient text-4xl font-normal  ${iconClassName}`} />
      <p className={`white-neon font-secondary ${textClassName}`}>VOLVER</p>
    </NavLink>
  );
}
