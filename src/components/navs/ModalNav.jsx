import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu } from "@nextui-org/react";
import { links } from ".";

export function ModalNav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar className="flex w-fit  items-center" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="hidden gap-4 lg:flex " justify="start">
        {links.map((l, i) => (
          <NavbarItem key={i} className="0">
            <NavLink
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
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="center" className="flex w-fit gap-10 ">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="justify-self-end lg:hidden" />
        {/* <i
          className="ri-instagram-line  icons  text-3xl text-yellow "
          onClick={() => window.open("https://www.instagram.com/spotsline_iluminacion/?hl=es-la", "_blank")}
        /> */}
      </NavbarContent>
      <NavbarMenu>
        {links.map((l, i) => (
          <NavbarItem key={i} className="0">
            <NavLink
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
          </NavbarItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
