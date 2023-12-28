import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { links } from ".";
import React from "react";
import { Navbar, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu } from "@nextui-org/react";
import { NavLink, Link } from "react-router-dom";

export function ModalNav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar className="flex w-fit  items-center" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="hidden gap-4 lg:flex " justify="start">
        {links.map((l, i) => (
          <NavbarItem className="0" key={i}>
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
        <i
          className="ri-instagram-line  icons  text-3xl text-yellow "
          onClick={() => window.open("https://www.instagram.com/spotsline_iluminacion/?hl=es-la", "_blank")}
        />
      </NavbarContent>
      <NavbarMenu>
        {links.map((l, i) => (
          <NavbarItem className="0" key={i}>
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
