import { NavLink } from "react-router-dom";
import { links } from ".";
import logo from "assets/logo.png";

export function NavBar() {
  return (
    <main className="flex h-14 w-full">
      <img src={logo} className="w-14" />
      {links.map((l, index) => (
        <NavLink key={index} to={l.path}>
          <h1>{l.name}</h1>
        </NavLink>
      ))}
      <i className="ri-user-fill text-xl" />
    </main>
  );
}
