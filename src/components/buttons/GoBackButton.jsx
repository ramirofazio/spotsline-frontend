import { NavLink } from "react-router-dom";

export function GoBackButton({ className }) {
  return (
    <NavLink to={-1} className={`icons absolute left-4 top-4 flex items-center ${className}`}>
      <i className="ri-arrow-left-s-line yellow-neon  animate-pulse text-4xl" />
      <p className="white-neon font-secondary">VOLVER</p>
    </NavLink>
  );
}
