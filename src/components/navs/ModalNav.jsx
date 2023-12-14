import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { links } from ".";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/react";
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
    <Navbar className="flex items-center " onMenuOpenChange={setIsMenuOpen}>

      <NavbarContent className="hidden gap-4 lg:flex " justify="start">
        {links.map((l, i) => (
          <NavbarItem className="0">
            <NavLink
              key={i}
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
      <NavbarContent justify="center" className="flex gap-10 border-2 justify-items-end">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="lg:hidden border-2" />
        <i
          className="ri-instagram-line  icons  text-3xl text-yellow "
          onClick={() => window.open("https://www.instagram.com/spotsline_iluminacion/?hl=es-la", "_blank")}
        />
      </NavbarContent>
      <NavbarMenu>
        {links.map((l) => (
          <NavbarMenuItem >
            <Link className="capitalize" to={l.path}>
              {l.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

/* export function ModalNav() {
  return( 
    <Dropdown className="w-[200%]">
      <DropdownTrigger>
        <i className="ri-menu-fill text-3xl">
        </i>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="w-full border-2">
        <DropdownItem className="" key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
} */
