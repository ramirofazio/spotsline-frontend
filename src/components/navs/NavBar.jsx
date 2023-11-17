import { NavLink } from "react-router-dom";
import { links, SearchInput } from "./index";
import logo from "assets/logo.png";
import { ButtonWithIcon } from "components/buttons";

export function NavBar() {
  return (
    <main className="flex w-full items-center justify-between  bg-white  p-6">
      <img src={logo} className="w-40" />
      <div className="flex w-full flex-col items-end gap-4 p-2">
        <section className="flex items-center space-x-4">
          <SearchInput />
          <ButtonWithIcon icon={"ri-user-fill"} text={"INGRESA"} classname={"space-x-4 rounded-full"} />
        </section>
        <section className="flex items-center">
          {links.map((l, index) => (
            <NavLink
              key={index}
              to={l.path}
              className={({ isActive }) =>
                `group mx-4 flex items-center text-lg uppercase tracking-wider transition  ${
                  isActive ? "text-yellow" : "text-gray"
                }`
              }
            >
              <i className="ri-arrow-down-s-line mr-1 text-xl text-yellow transition group-hover:text-gray" />
              {l.name}
            </NavLink>
          ))}
          <i
            className="ri-instagram-line icons ml-20 text-3xl text-yellow"
            onClick={() => window.open("https://www.instagram.com/spotsline_iluminacion/?hl=es-la", "_blank")}
          />
        </section>
      </div>
    </main>
  );
}
