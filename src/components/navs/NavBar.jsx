import React, { useEffect } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarItem,
  Button,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import logo from "assets/logo.png";
import { links } from ".";
import { Link, useLocation, useNavigate } from "react-router-dom";

const mockCategories = ["luz 1", "luz 2", "luz 3", "luz 4", "luz 5", "luz 6", "luz 8", "luz 9"];

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
      <NavbarContent justify="start" className="sm:hidden">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent justify="center">
        <Image
          src={logo}
          className="w-20 hover:animate-pulse hover:cursor-pointer md:w-24"
          onClick={() => navigate("/")}
        />
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {links.map(({ name, path }, index) => (
          <NavbarItem
            key={index}
            className={`group flex h-full items-center gap-2 border-b-4 border-transparent px-2 ${
              pathname === path && " border-primary"
            }`}
          >
            <i class="ri-arrow-down-s-line text-lg font-bold text-primary transition group-hover:animate-pulse"></i>
            {name === "productos" ? (
              <Dropdown className="border-1 border-primary bg-secondary">
                <DropdownTrigger className="text-secondary hover:cursor-pointer">PRODUCTOS</DropdownTrigger>
                <DropdownMenu variant="solid" aria-label="Dropdown menu with icons" color="primary">
                  <DropdownItem
                    key={index}
                    className="group my-[1px] transition hover:opacity-90"
                    startContent={
                      <i class="ri-arrow-right-s-line text-lg font-bold text-secondary transition group-hover:text-white"></i>
                    }
                    onClick={() => navigate("/productos/0")}
                  >
                    Todos
                  </DropdownItem>
                  {mockCategories.map((text, index) => (
                    <DropdownItem
                      className="group my-[1px] transition hover:opacity-90"
                      key={index}
                      startContent={
                        <i class="ri-arrow-right-s-line text-lg font-bold text-secondary transition group-hover:text-white"></i>
                      }
                      onClick={() => navigate(`/productos/${text}`)}
                      //? Algo asi habria que hacer aca para filtrar automaticamente por categoria
                    >
                      {text}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link
                className={`text-md w-full uppercase text-secondary ${pathname === path && "!text-primary"}`}
                to={path}
              >
                {name}
              </Link>
            )}
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <Button
          color="primary"
          variant="solid"
          radius="sm"
          size="md"
          className="font-semibold text-secondary"
          endContent={<i className="ri-user-fill" />}
          onClick={() => navigate("/sign-in")}
        >
          LOGIN
        </Button>
      </NavbarContent>

      <NavbarMenu className="gap-4">
        {links.map(({ name, path }, index) => (
          <Button
            key={index}
            variant="solid"
            fullWidth
            radius="sm"
            color="primary"
            className="justify-start font-bold uppercase text-secondary "
            startContent={<i class="ri-arrow-right-s-line text-lg text-secondary"></i>}
            onClick={() => navigate(path)}
          >
            {name}
          </Button>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
